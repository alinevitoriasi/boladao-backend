function adminMiddleware(req, res, next) {
    if (!req.session.user) {
        return res.status(403).json({ msg: 'Não autorizado' });
    }

    if (!req.session.user.isAdmin) {
        return res.status(403).json({ msg: 'Acesso restrito a administradores.' });
    }
    next();
}

module.exports = adminMiddleware;