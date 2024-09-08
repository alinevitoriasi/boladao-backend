const express = require('express');
const consign = require('consign');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

module.exports = () => {
  const app = express();
  const cors = require("cors");
  const session = require('express-session');

  // Configuração do rate limiter
  const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 15 minutos
    max: 100, // limite de 100 requisições por IP por janela de tempo
    message: 'Muitas requisições de seu IP, por favor tente novamente mais tarde.'
  });
  app.use(limiter);

  app.use(helmet());

  const allowedOrigins = [
    'http://localhost:3000',
    'https://campus-juntos.vercel.app',
  ];

  app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
      callback(null, !origin || allowedOrigins.includes(origin));
    }
  }));

  app.use(session({
    secret: '@boladao-Token',
    saveUninitialized: false,
    resave: false,
    cookie: { secure: true,
      domain: '.campus-juntos.vercel.app', 
      path: '/',
      httpOnly: true, maxAge: 3600000  }
  }));

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