const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser'); 
const path = require('path');
                    
            
module.exports = () => {
  const app = express();
  const cors = require("cors");
  app.use(cors());
  app.set('port', (5000));

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  consign({cwd: 'server'})
    .include('models')
    .include('controllers')
    .then('routes')
    .into(app);

  return app;
}