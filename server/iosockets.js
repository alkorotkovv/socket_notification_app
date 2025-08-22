const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const compression = require("compression");
const cors = require('cors');
const {Server} = require("socket.io");
const {createPool} = require(__basedir + '/config/db_pg.js');

const sockets = [
  './modules/global/socket',
  './modules/temp_solutions/react_run_equip/socket',
]

const createIOSocketServer = (dbConfig) => {
  console.log('Запускаем вебсокет сервер');

  const {pool} = createPool(dbConfig)

//Для запуска на локалке - закомментировать

  // const app = express();
  // let portHTTPS = 3650;
  // let serverHTTPS = null
  // app.set('port', portHTTPS);
  // let httpsOptions = {
  //   secureProtocol: 'SSLv23_method',
  //   secureOptions: require('constants').SSL_OP_NO_SSLv3,
  //   key: fs.readFileSync(path.join(__dirname, '../server/ssl/', 'nn-fmwebdmz.key'), 'utf-8'),
  //   cert: fs.readFileSync(path.join(__dirname, '../server/ssl/', 'nn-fmwebdmz.cer'), 'utf-8'),
  // }
  //
  // const allowCrossDomain = function(req, res, next) {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', '*');
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, api-key,udid,device-type,Authorization');
  //   //res.header('Content-Security-Policy-Report-Only', '*');
  //   next();
  // }
  //
  // serverHTTPS = https.createServer(httpsOptions, app);
  // serverHTTPS.listen(portHTTPS);
  //
  // app.disable('x-powered-by');
  // app.use(compression());
  // app.set('trust proxy', true)
  // app.enable('trust proxy');
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: false }));
  // app.use(allowCrossDomain);
  // app.use(cors());


  const io = new Server(
    // serverHTTPS       //Для запуска на локалке - закомментировать
    3650, {cors: {origin: 'https://localhost:3600'}},    //Для порта 3600
    // 3650, {cors: {origin: 'https://localhost:3500'}}
    // 3650, {cors: {origin: '*'}}
  )

  sockets.forEach(s => {
    require(s)(io, pool)
  })
}


module.exports = {
  createIOSocketServer
}