const express = require('express');
const consign = require('consign');
require("dotenv").config({ path: "./config.env" });

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require("cors");
const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = () => {
  const app = express();

  // Configuração do rate limiter
  const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 15 minutos
    max: 1000, // limite de 100 requisições por IP por janela de tempo
    message: 'Muitas requisições de seu IP, por favor tente novamente mais tarde.'
  });
  app.use(limiter);

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "script-src": ["'self'"],
          "img-src": ["'self'"],
        },
      },
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: "same-origin" },
      dnsPrefetchControl: { allow: false },
      frameguard: { action: "deny" }, // Evita que seu site seja renderizado dentro de um iframe
      hsts: { maxAge: 63072000, includeSubDomains: true, preload: true }, // HTTP Strict Transport Security
      noSniff: true, // Evita a detecção MIME
      xssFilter: true, // Proteção contra XSS
    })
  );

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

  app.set("trust proxy", 1);
  app.use(session({
    secret: '@boladao-Token',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URI,
      collectionName: 'sessions'
    }),
    cookie: {
      secure: false, //true- https /false-local
      maxAge: 1000 * 60 * 60 * 24  // 1 dia
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