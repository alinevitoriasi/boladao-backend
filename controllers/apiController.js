const Post = require("../models/PostModel");

exports.test = function (req, res) {
  res.send('Olá');
};

exports.create = function (req, res, next) {
  Post.create(req.body).then(function(Post){
      res.send(Post);
    }).catch(next);
};

exports.list = function (req, res) {
  Post.find({}).then(function(Post){
  res.send(Post);
  });
};

exports.getPostById = function (req, res) {
  Post.findOne({_id: req.params.id}).then(function(Post){
  res.send(Post);
  });
};

exports.update = function (req, res, next) {
  Post.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Post.findOne({_id: req.params.id}).then(function(Post){
      res.send(Post);
    });
  }).catch(next);
};

exports.delete = function (req, res, next) {
  Post.findByIdAndRemove({_id: req.params.id}).then(function(Post){
    res.send(Post);
  }).catch(next);
};