const express = require('express');
const consign = require('consign');
const path = require('path');
                            
module.exports = () => {
  const app = express();
  const cors = require("cors");
  app.use(cors());
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