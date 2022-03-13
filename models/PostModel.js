const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SchemaPost = new Schema({
  text: {
    type: String,
    required: [true, 'Campo obrigatório!']
  },
});

const Post = mongoose.model('CollectionTeste', SchemaPost);

module.exports = Post;