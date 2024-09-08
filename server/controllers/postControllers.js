const mongoose = require('mongoose');
const modelPost = mongoose.model('Post');

const logger = require('../logger');

let postController = {}

postController.create = async function (req, res, next) {
  try {
    if(req.session.user){
      const newPost = new modelPost({
        text: req.body.text,
        author: {
          username: req.session.user.username,
          id: req.session.user._id
        },
      });

      const Post = await modelPost.create(newPost);
      res.send(Post);
    }
    else {
      res.status(401).json({ message:'Não autorizado!'})
    }
  }
  catch(err) {
    next(err)
  }
};

postController.list = async function (req, res, next) {
  try {
    console.log('req:', req.session);
    if(req.session.user){
      const Post = await  modelPost.find({})
      res.send(Post);
    }
    else {
      res.status(401).json({ message:`Não autorizado! ${req.session.user}`})
    }
  }
  catch(err) { 
    next(err)
  }
};


postController.mypost = async function (req, res, next) {
  try {
    if(req.session.user){
      const Post = await  modelPost.find({'author.id':req.session.user._id})
      res.send(Post);
    }
    else {
      res.status(401).json({ message:'Não autorizado!'})
    }
  }
  catch(err) {
    next(err)
  }
};


postController.comment = async function (req, res) {
  try {
    await modelPost.findByIdAndUpdate({_id: req.params.id},
      { $push: { comments: req.body } })
    const Post = await modelPost.findOne({_id: req.params.id})
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