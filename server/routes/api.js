const postController = require('../controllers/postControllers');

module.exports = (app) => {
    app.route('/posts')
    .get(postController.list)
    .post(postController.create)


}

// const express = require ('express');

// const router = express.Router();

// const apiController = require('../controllers/postControllers');

// router.get('/teste', apiController.test);
// router.get('/posts',apiController.list);
// router.post('/post',apiController.create);
// router.get('/post/:id',apiController.getPostById);
// router.put('/post/:id',apiController.update);
// router.delete('/post/:id',apiController.delete);

// module.exports = router;