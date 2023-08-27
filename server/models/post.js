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
  text: {
    type: String,
    required: [true, 'Campo obrigatório!']
  },
  date: String,
  comments:[{ text: String,  username: String, date: String}]
});

mongoose.model('Post', PostSchema)
