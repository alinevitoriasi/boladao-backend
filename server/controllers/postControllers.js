const mongoose = require('mongoose');
const modelPost = mongoose.model('Post');


let postController = {}

postController.create = async function (req, res, next) {
  try {
    const newPost = new modelPost({
      text: req.body.text,
      date: req.body.date,
      location: req.body.location,
      type: req.body.type,
      isAnonymous: req.body.isAnonymous,
      author: {
        id: req.user.id
      },
    });

    await modelPost.create(newPost);
    res.status(200).json({ message: 'Criado com Sucesso!' });
  }
  catch(err) {
    next(err)
  }
};

postController.list = async function (req, res, next) {
  try {

      console.log('teste',req.user)
      const { type, startDate, endDate, text } = req.query;

      const filter = {};
      if (type) {
        const typesArray = type.split(',').map(item => item.trim());
        filter.type = { $in: typesArray };
      }
      if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) {
          filter.createdAt.$gte = new Date(startDate);
        }
        if (endDate) {
          filter.createdAt.$lte = new Date(endDate);
        }
      }
      if (text) {
        filter.text = { $regex: new RegExp(text, 'i') };
      }


      const posts = await modelPost.find(filter);
      const postIsVisible = posts?.filter(post=> post.isVisible !== false);


      const formatDocument = (posts) =>{
        return posts.map(post => {
        const { username } = post.author;
        const usernameLength = username && username.length > 3 ? username.length - 3 : 0;
        const usernameFormatted = username ? username.slice(0, 3).toLowerCase() + '*'.repeat(usernameLength) : '';
        return {
          _id: post._id,
          text: post.text,
          type: post.type,
          author: { username: usernameFormatted },
        };
      }).reverse();
    }



     if(req.user.role ==='admin'){
      const total = await modelPost.countDocuments(filter);
        return res.json({
          total,
          posts: formatDocument(posts)
        });
     }

     return res.json({
      posts: formatDocument(postIsVisible)
    });

  } catch (err) {
    next(err);
  }
};

postController.getPostById = async function (req, res) {
  try {
    const post = await modelPost.findOne({_id: req.params.id})

    const commentsFormatted = post?.comments?.map(comment=> {
      return { text: comment.text  };
    })

    if(req.user.role ==='admin'){
     return res.send(post);
    }

    return res.send({text: post.text, type: post.type , comments: commentsFormatted});
  }
  catch(err) {
    next(err);
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

postController.mypost = async function (req, res, next) {
  try {
    const posts = await modelPost.find({'author.id':req.user.id})

    const formatDocument = (posts) =>{
      return posts.map(post => {
      return {
        _id: post._id,
        text: post.text,
        type: post.type,
        isVisible: post.isVisible,
        moderation: post.moderation
      };
    }).reverse();
  }

    return res.status(200).json(formatDocument(posts));
  }
  catch(err) {
    next(err)
  }
};

postController.update = async function (req, res) {
  try {
    await modelPost.findByIdAndUpdate({_id: req.params.id}, req.body)
    return res.status(200).json({ message:'Atualizado com sucesso!'});
  }
  catch(err) {
    next(err)
  }
};

postController.report = async function (req, res) {
  try {
    const Post = await modelPost.findOne({_id: req.params.id})
    await modelPost.findByIdAndUpdate({_id: req.params.id},{ isVisible: !Post.isVisible, moderation: req.body.moderation })

    return res.status(200).json({ message:'Atualizado com sucesso!'});
  }
  catch(err) {
    next(err)
  }
};

postController.delete = async function (req, res) {
  try {
    await modelPost.findByIdAndRemove({_id: req.params.id})
    return res.status(200).json({ message:'Deletado com sucesso!'});
  }
  catch(err) {
    next(err)
  }
};







module.exports = postController;