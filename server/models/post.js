const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  text: {
    type: String,
    required: [true, 'Campo obrigatório!']
  },
});

mongoose.model('Post', PostSchema)
