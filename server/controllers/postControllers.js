const mongoose = require('mongoose');
const modelPost = mongoose.model('Post');


let postController = {}

postController.create = function (req, res, next) {
  modelPost.create(req.body).then(function(Post){
      res.send(Post);
    }).catch(next);
};

postController.list = function (req, res) {
  modelPost.find({}).then(function(Post){
  res.send(Post);
  });
};

// exports.getPostById = function (req, res) {
//   Post.findOne({_id: req.params.id}).then(function(Post){
//   res.send(Post);
//   });
// };

// exports.update = function (req, res, next) {
//   Post.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
//     Post.findOne({_id: req.params.id}).then(function(Post){
//       res.send(Post);
//     });
//   }).catch(next);
// };

// exports.delete = function (req, res, next) {
//   Post.findByIdAndRemove({_id: req.params.id}).then(function(Post){
//     res.send(Post);
//   }).catch(next);
// };

module.exports = postController;