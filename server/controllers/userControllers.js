const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const modelUser = mongoose.model('User');

let userController = {}

userController.allUsers = async (req, res) => {
    try {
        const Users = await modelUser.find({}, {_id:0, password:0, isAdmin:0, __v:0 })
        res.json(Users)
    }
    catch(err){
        res.send(err)
    }
}
    
userController.newUser = async (req, res) => {
    if(!req.body.username || !req.body.password) 
        return res.status(400).json({success:false, message:'Campos obrigatórios'})
    try{
        const promiseFindByUsername = modelUser.findOne({'username': req.body.username})
        const promiseFindByEmail = modelUser.findOne({'email': req.body.email})

        const [user, email] = await Promise.all([promiseFindByUsername, promiseFindByEmail])

        if(user) return res.status(400).json({ message:'Esse nome não está disponivel.'})
        
        if(email) return res.status(400).json({ message:'Email já cadastrado!'})
        
        const encryptedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new modelUser({
            username: req.body.username,
            password: encryptedPassword,
            email: req.body.email,
            isAdmin:req.body.isAdmin,
        })

        await newUser.save()
        res.status(201).json({ message:'Usuário criado com sucesso'})    
    }
    catch(err){
       return res.status(500).json({ message:'Erro desconhecido aaaaa!!'})
    }
}

module.exports = userController;