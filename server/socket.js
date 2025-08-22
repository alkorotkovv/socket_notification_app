const logger = require(__basedir + '/config/winston');
const {production} = require('../../config/local.json');

module.exports = async function(io, pool) {

  const nsp = io.of('/app')

  // Хранилище для namespace страниц
  const pageNamespaces = {};

  //Получаем страницы из БД
  const getPages = async() => {
    const sqlQ = `select id from dbo.dict where id_type = 9`
    try {
      const result = await pool.query(sqlQ);
      return result.rows.map(row => row.id)
    }
    catch (err) {
      console.log(err);
      return []
    }
  }

  //Функция создания namespace для страницы
  const createPageNamespace = (pageId) => {

    const namespaceName = `/page_${pageId}`;
    pageNamespaces[pageId] = io.of(namespaceName);

    pageNamespaces[pageId].on('connection', (socket) => {
      // if (production) {
        socket.on('session_start', async ({uid, page_id}) => {
          console.log(`Клиент подключился к странице ${pageId}`);
          await startSession(socket.id, uid, page_id)
        })

        socket.on('session_end', async () => {
          console.log(`Клиент отключился от страницы ${pageId}`);
          await endSession(socket.id);
        });

        socket.on('disconnect', async () => {
          console.log(`Клиент отключился от страницы ${pageId}`);
          await endSession(socket.id);
        });
      // }
    });

    return pageNamespaces[pageId];
  };

  //Функция создания nsp для всех страниц
  const createPagesNamespaces = async() => {
    try {
      const pages = await getPages();
      console.log('Найдены страницы в БД:', pages);

      pages.forEach(id => {
        createPageNamespace(id);
      });

      console.log(`Создано ${pages.length} namespace для страниц`);
    } catch (error) {
      console.error('Ошибка инициализации namespace:', error);
    }
  }

  createPagesNamespaces()

  async function startSession(socket_id, uid, page_id) {
    const sqlQ = `INSERT INTO dbo.user_visits(socket_id, user_id, page_id, entry_time) values ($1, $2, $3, now())`;
    const values = [socket_id, uid, page_id]

    try {
      await pool.query(sqlQ, values);
    } catch (err) {
      console.error('Ошибка добавления сессии в бд:', err);
    }
  }

  async function endSession(socket_id) {

    const sqlQ = `UPDATE dbo.user_visits SET exit_time = NOW(), is_active = FALSE
                WHERE socket_id = $1 and is_active = TRUE`;
    const values = [socket_id]

    try {
      await pool.query(sqlQ, values);
    }
    catch (err) {
      console.log(err);
    }
  }

  socket.on('connection', (socket) => {

    socket.on('reboot_server', async (data) => {

        console.log('MESSAGE REBOOT SERVER')
        console.log(data)

        const { pages, message, level } = data;

        pages.forEach(pageId => {
          const pageNsp = pageNamespaces[pageId];
          pageNsp.emit('reboot_server', { message, level });
          console.log(`📨 Отправлено в namespace страницы ${pageId}`);
        });

      })

    socket.on('disconnect', async () => {
        // console.log('Сокет соединение со всем приложением закрыто')
      })

  })

}