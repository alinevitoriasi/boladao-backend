const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author:{
    username : {
      type: String,
    },
    id : {
      type: String,
      required: [true, 'Campo obrigatório']
    },
  },
  location: String,
  text: {
    type: String,
    required: [true, 'Campo obrigatório!']
  },
  date: String,
  type: [String],
  isAnonymous: Boolean,
  isVisible: {
    type: Boolean,
    required: true,
    default: true
  },
  moderation: {
    type: String,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

mongoose.model('Post', PostSchema)
