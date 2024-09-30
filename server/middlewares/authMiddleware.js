function authMiddleware(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Não autorizado' });
    }

    next();
}

module.exports = authMiddleware;