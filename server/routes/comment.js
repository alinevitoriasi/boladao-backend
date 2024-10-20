const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = (app) => {
    app.route('/comment')
    .post(authMiddleware, commentController.create)

    app.route('/post/:postId/comments',)
    .get(authMiddleware, commentController.getCommentsByPost)

    app.route('/comments/:commentId',)
    .put(authMiddleware, commentController.updateComment)
    .delete(authMiddleware, commentController.deleteComment)
}
