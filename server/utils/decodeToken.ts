const jwt = require('jsonwebtoken');

function decodeToken(token) {
  const secret = '@boladao-token';

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {

    console.error('Token inválido:', err);
    return null;
  }
}

module.exports = decodeToken;
