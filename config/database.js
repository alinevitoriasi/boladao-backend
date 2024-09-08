const mongoose = require('mongoose');
const logger = require('../server/logger');
require("dotenv").config({ path: "./config.env" });

mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.on('connected', function () {
  logger.info('Conectado ao banco de dados');
  console.log('Conectado ao banco de dados');
});

mongoose.connection.on('error', (err) => {
  // logger.error(`Erro detectado: ${err.message}`);
  console.log('Erro na conexão '+err);
});

mongoose.connection.on('disconnect', () => {
    console.log('Desconectado');
  });
