const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : { 
        type: String,
        required: [true, 'Campo obrigatório']
    },
    password : {
        type: String,
        required: [true, 'Campo obrigatório']
    },
    email : {
        type: String,
        required: [true, 'Campo obrigatório']
    },
    isAdmin : {
        type: Boolean,
        required: true,
        default: false
    }
})

mongoose.model('User', UserSchema)