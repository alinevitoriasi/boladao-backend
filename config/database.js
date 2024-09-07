const mongoose = require('mongoose');

require("dotenv").config({ path: "./config.env" });

mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.on('connected', function () {
  console.log('Conectado ao banco de dados');
});

mongoose.connection.on('error', (err) => {
  console.log('Erro na conexão '+err);
});

mongoose.connection.on('disconnect', () => {
    console.log('Desconectado');
  });
