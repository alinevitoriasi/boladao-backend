const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author:{
    username : {
      type: String,
      required: [true, 'Campo obrigatório']
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
  comments:[{
    text: String,
    username: String,
    date: String,
    isVisible: {
    type: Boolean,
    required: true,
    default: true
  },}]
});

mongoose.model('Post', PostSchema)
