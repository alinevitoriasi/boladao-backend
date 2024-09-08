const express = require('express');
const consign = require('consign');

// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');

module.exports = () => {
  const app = express();
  const cors = require("cors");
  const session = require('cookie-session');
  app.set("trust proxy", 1);
  // // Configuração do rate limiter
  // const limiter = rateLimit({
  //   windowMs: 30 * 60 * 1000, // 15 minutos
  //   max: 100, // limite de 100 requisições por IP por janela de tempo
  //   message: 'Muitas requisições de seu IP, por favor tente novamente mais tarde.'
  // });
  // app.use(limiter);

  // app.use(helmet());

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


  app.use(session({ secret:'@boladao-Token',
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    }
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