const mongoose = require('mongoose');

const modelPost = mongoose.model('Post');
const Comment = mongoose.model('Comment');

let commentController = {}

commentController.create = async function (req, res, next) {
  try {
    const { content, postId } = req.body;

    const post = await modelPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    const newComment = new Comment({
      content,
      author: req.user.id,
      post: postId,
    });

    await newComment.save();

    post.comments.push(newComment._id);
    await post.save();

    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


commentController.getCommentsByPost  = async function (req, res, next) {
  try {
    const { postId } = req.params;
    console.log('postId',postId)

    const post = await modelPost.findById(postId);
    console.log('post',post)
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    const comments = await Comment.find({ post: postId }).populate('author', 'name');

    const userId = req.user.id; // ID do usuário logado
    const commentsWithEditFlag = comments.map(comment => ({
      _id: comment._id,
      content: comment.content,
      isEditable: comment.author._id.equals(userId)
    }));

    const commentIsVisible = commentsWithEditFlag?.filter(post=> post.isVisible !== false);

    return res.status(200).json(commentIsVisible);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




commentController.updateComment  = async function (req, res) {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comentário não encontrado.' });
    }

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Você não tem permissão para editar este comentário.' });
    }

    comment.content = content;
    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


commentController.deleteComment  = async function  (req, res, next) {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comentário não encontrado.' });
    }

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Você não tem permissão para excluir este comentário.' });
    }

    await comment.remove();

    const post = await modelPost.findById(comment.post);
    if (post) {
      post.comments.pull(commentId);
      await post.save();
    }

    return res.status(200).json({ message: 'Comentário excluído com sucesso.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



module.exports = commentController;
