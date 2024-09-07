const express = require('express');
const consign = require('consign');
const path = require('path');

const rateLimit = require('express-rate-limit');

module.exports = () => {
  const app = express();
  const cors = require("cors");
  const session = require('express-session');

  // Configuração do rate limiter
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutos
    max: 100, // limite de 100 requisições por IP por janela de tempo
    message: 'Muitas requisições de seu IP, por favor tente novamente mais tarde.'
  });
  app.use(limiter);

  app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
  app.use(session({ secret:'@boladao-Token',saveUninitialized: false, resave: false }));

  app.set('port', (5000));
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  consign({cwd: 'server'})
    .include('models')
    .include('controllers')
    .then('routes')
    .into(app);

  return app;
}