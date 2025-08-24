const {pages} = require('../data/mockData')

const handleSocketConnection = (io) => {

  // const nsp = io.of('/app')

  // Хранилище для namespace страниц
  const pageNamespaces = {};

  //Функция создания namespace для страницы
  const createPageNamespace = (pageId) => {

    const namespaceName = `/page_${pageId}`;
    pageNamespaces[pageId] = io.of(namespaceName);

    pageNamespaces[pageId].on('connection', (socket) => {

      console.log(`Клиент подключился к странице ${pageId}`);
 
        socket.on('session_start', async ({uid, page_id}) => {
          console.log(`Клиент подключился к странице ${pageId}`);
          // await startSession(socket.id, uid, page_id)
        })

        socket.on('session_end', async () => {
          console.log(`Клиент отключился от страницы ${pageId}`);
          // await endSession(socket.id);
        });

        socket.on('disconnect', async () => {
          console.log(`Клиент отключился от страницы ${pageId}`);
          // await endSession(socket.id);
        });

    });

    return pageNamespaces[pageId];
  };

  //Функция создания nsp для всех страниц
  const createPagesNamespaces = async() => {
    try {
      // const pages = await getPages();
      console.log('Найдены страницы в БД:', pages);

      pages.forEach(page => {
        createPageNamespace(page.id);
      });

      console.log(`Создано ${pages.length} namespace для страниц`);
    } catch (error) {
      console.error('Ошибка инициализации namespace:', error);
    }
  }

  createPagesNamespaces()


  io.on('connection', (socket) => {
    console.log('Пользователь подключился:', socket.id);

    socket.on('notification', async (data) => {

        console.log('notification')
        console.log(data)

        const { pages, message, level } = data;

        pages?.forEach(pageId => {
          const pageNsp = pageNamespaces[pageId];
          pageNsp.emit('notification', { message, level });
          console.log(`Отправлено в namespace страницы ${pageId}`);
        });

      })

    // Обработка отключения клиента
    socket.on('disconnect', () => {
      console.log('Пользователь отключился:', socket.id);
      io.emit('userLeft', { userId: socket.id });
    });

    // Обработка уведомлений о действиях пользователя
    socket.on('userAction', (data) => {
      console.log('Действие пользователя:', data);
      socket.broadcast.emit('userActivity', {
        userId: socket.id,
        action: data.action,
        time: new Date().toLocaleTimeString()
      });
    });
  });
};

module.exports = {
  handleSocketConnection
};