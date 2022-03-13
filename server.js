const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');

// Ligar á B.D.: 'test'->user da BD, ´nnn´->pass
mongoose.connect(process.env.DB_URI);

// Confirma ligação na consola
mongoose.connection.on('connected', function () {
  console.log('Connected to Database '+'test');
});

// Mensagem de Erro
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

// 'END POINT INVÁLIDO!'
app.get('/', function(req, res){
  res.send('END POINT INVÁLIDO!');
});

const routes = require('./routes/api');
app.use(routes);

app.use(function(err, req, res, next){

  const message = err?.errors?.text?.properties?.message

  res.status(422).send({error: message});
});


const port = 5000
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

