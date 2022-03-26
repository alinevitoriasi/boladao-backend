const mongoose = require('mongoose');
const modelPost = mongoose.model('Post');

let postController = {}

postController.create = async function (req, res, next) {
  try {
    const Post = await modelPost.create(req.body);
    res.send(Post);
  }
  catch(err) {
    next(err)
  }
};

postController.list = async function (req, res) {
  try {
    const Post = await  modelPost.find({})
    res.send(Post);
  }
  catch(err) {
    next(err)
  }
};

postController.update = async function (req, res) {
  try {
    await modelPost.findByIdAndUpdate({_id: req.params.id}, req.body)
    const Post = await modelPost.findOne({_id: req.params.id})
    res.send(Post);
  }
  catch(err) {
    next(err)
  }
};

postController.delete = async function (req, res) {
  try {
    const Post = await modelPost.findByIdAndRemove({_id: req.params.id})
    res.send(Post);
  }
  catch(err) {
    next(err)
  }
};

postController.getPostById = async function (req, res) {
  try {
    const Post = await modelPost.findOne({_id: req.params.id})
    res.send(Post);
  }
  catch(err) {
    next(err)
  }
};

module.exports = postController;