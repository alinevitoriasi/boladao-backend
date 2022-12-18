const express = require('express');
const consign = require('consign');
const path = require('path');
                            
module.exports = () => {
  const app = express();
  const cors = require("cors");
  const session = require('express-session');
  
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