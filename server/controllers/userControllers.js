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
    if(req.body.username && req.body.password){
        if(req.body.comparePassword && req.body.password === req.body.comparePassword){
            try{
                const User = await modelUser.findOne({ 'username': req.body.username})
                if(User){
                    res.status(200).json({ message:'Esse nome não está disponivel.'})
                }
                else{
                    try{
                       const hash = await bcrypt.hash(req.body.password, 10)

                       let encryptedPassword = hash;

                       let newUser = new modelUser({
                           username: req.body.username,
                           password: encryptedPassword,
                           email: req.body.email,
                           isAdmin:req.body.isAdmin,
                       })

                       try{
                            await newUser.save()
                            res.status(201).json({ message:'Usuário criado com sucesso'})
                        }
                        catch(err){
                            res.status(500).json({ message:err})
                        }
                       
                    }
                    catch(err){
                        res.status(500).json({ message:err})
                    }
                    
                }
            }
            catch(err){
                res.statusCode(500).json({ message:err})
            }
        }
        else{
            res.status(400).json({success:false, message:'As senhas não coincidem.'})
        }
    }
    else{
        res.status(400).json({success:false, message:'Campos obrigatórios'})
    }    

}

module.exports = userController;