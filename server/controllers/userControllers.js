const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const modelUser = mongoose.model('User');
const schema = require('../validators/passwordValidator');

let userController = {}

const messageErrorValidator =
{
    min: 'A senha deve conter no mínimo 8 caracteres',
    max: 'A senha deve conter no máximo 100 caracteres',
    digits: 'A senha deve conter pelo menos 2 dígitos',
    spaces: 'A senha deve conter não deve conter espaços',
    uppercase: 'A senha deve ter letras maiúsculas',
    lowercase: 'A senha deve ter letras minúsculas',
}



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


        const password = req.body.password;
        const isValid = schema.validate(password);
        const validationResult = schema.validate(password, { list: true });

        console.log('Erros:', validationResult);
        console.log('isValid:', isValid);

        if (validationResult?.length) return res.status(400).json({ message: messageErrorValidator[validationResult[0]]})
        if (!isValid) return res.status(400).json({ message:'Senha inválida!'})




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
        console.log(err)
       return res.status(500).json({ message:'Erro desconhecido!!'})
    }
}

module.exports = userController;