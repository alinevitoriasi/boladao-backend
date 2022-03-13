const express = require ('express');

const router = express.Router();

const apiController = require('../controllers/apiController');

router.get('/teste', apiController.test);
router.get('/posts',apiController.list);
router.post('/post',apiController.create);
router.get('/post/:id',apiController.getPostById);
router.put('/post/:id',apiController.update);
router.delete('/post/:id',apiController.delete);

module.exports = router;