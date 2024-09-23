const postController = require('../controllers/postControllers');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

module.exports = (app) => {
    app.route('/posts')
    .get(authMiddleware, postController.list)
    .post(authMiddleware, postController.create)

    app.route('/posts/:id')
    .put(authMiddleware,postController.update)
    .delete(authMiddleware,postController.delete)
    .get(authMiddleware, postController.getPostById)

    app.route('/add/:id')
    .put(authMiddleware, postController.comment)

    app.route('/mypost')
    .get(authMiddleware,postController.mypost)

    app.route('/admin/posts')
    .get(adminMiddleware, postController.list)
    app.route('/admin/post/:id')
    .get(adminMiddleware, postController.getPostById)
    .put(adminMiddleware, postController.report)

}
