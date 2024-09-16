const mongoose = require('mongoose');
const modelPost = mongoose.model('Post');


let postController = {}

postController.create = async function (req, res, next) {
  try {
    if(req.session.user){
      const newPost = new modelPost({
        text: req.body.text,
        date: req.body.date,
        location: req.body.location,
        type: req.body.type,
        isAnonymous: req.body.isAnonymous,
        author: {
          username: req.session.user.username,
          id: req.session.user._id
        },
      });

      await modelPost.create(newPost);
      res.status(200).json({ message: 'Criado com Sucesso!' });
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
  console.log('req',req.session)
  try {
    if(req.session.user){
        const posts = await modelPost.find({});
        console.log(posts);

        const modifiedPosts = posts.map(post => {
          const { username } = post.author
          const usernameLength = username && username?.length > 3 ? username?.length - 3 : 0;
          const usernameFormatted =  username?.slice(0, 3)?.toLowerCase() + '*'.repeat(usernameLength)
          return {
            _id: post._id,
            text: post.text,
            type: post.type,
            author: {username: username? usernameFormatted : '' },
          };
        }).reverse();
        res.send(modifiedPosts);
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