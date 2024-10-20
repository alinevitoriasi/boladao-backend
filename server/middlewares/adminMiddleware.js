
const decodeToken = require('../utils/decodeToken')


function adminMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).send({message:'Token não fornecido.'});
    }
    const userData = decodeToken(token);
    if (!userData) {
      return res.status(401).send({message:'Token inválido ou expirado.'});
    }

    if (userData?.user?.role!=='admin') {
        return res.status(401).json({ message: 'Acesso restrito a administradores.' });
    }

    req.user = userData;
    next();

}

module.exports = adminMiddleware;