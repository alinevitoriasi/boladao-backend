const jwt = require('jsonwebtoken')
const decodeToken = require('../utils/decodeToken')


function authMiddleware(req, res, next) {

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).send({message:'Token não fornecido.'});
  }

  const userData = decodeToken(token);

  if (!userData) {
    return res.status(401).send({message:'Token inválido ou expirado.'});
  }

  req.user = userData;
  next();

}

module.exports = authMiddleware;