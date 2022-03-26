const sessionController = require('../controllers/sessionControllers');

module.exports = (app) => {
    app.route('/login')
    .post(sessionController.login)
}