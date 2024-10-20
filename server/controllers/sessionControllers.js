const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const modelUser = mongoose.model('User');

let sessionController = {}

sessionController.login = async function (req, res, next) {
  try {
    const user = await modelUser.findOne({ 'email': req.body.email})
    if(!user){
      return res.status(401).json({success:false, message:'Credenciais inválidas. Verifique seu e-mail e senha e tente novamente.'})
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match){
      return res.status(401).json({success:false, message:'Credenciais inválidas. Verifique seu e-mail e senha e tente novamente.'})
    }

    const token = jwt.sign({id: user._id},'@boladao-token',{expiresIn:"1d"})

    // req.session.user = user;
    req.session.user.save()

    return res.status(200).json({token:token , isAdmin:user?.isAdmin, message:'Login realizado com sucesso!'})
  }
  catch(err) {
    return res.status(500).json(err)
  }
};



module.exports = sessionController;