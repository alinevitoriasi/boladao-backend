const userController = require('../controllers/userControllers');

module.exports = (app) => {
    app.route('/users')
    .get(userController.allUsers)
    .post(userController.newUser)
}