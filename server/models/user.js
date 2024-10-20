const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Campo obrigatório']
    },
    password: {
        type: String,
        required: [true, 'Campo obrigatório']
    },
    email: {
        type: String,
        required: [true, 'Campo obrigatório']
    },
    role:{
        type: String,
        required: true,
        default: 'user'
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
})

mongoose.model('User', UserSchema)