const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const modelUser = mongoose.model('User');

let sessionController = {}

sessionController.login = async function (req, res, next) {
  try {
    const user = await modelUser.findOne({ 'email': req.body.email})
    if(!user){
      return res.status(401).json({success:false, message:'Email - Errou feio, errou rude!'})
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match){
      return res.status(401).json({success:false, message:'Senha - Errou feio, errou rude!'})
    }

    const token = jwt.sign({id: user._id},'@boladao-token',{expiresIn:"3d"})
    req.session.user = user;
    logger.info(`req: ${req.session.user}`);
    logger.info(`user: ${user}`);
    return res.status(200).json({auth:true, message:'TUDO SUPIMPA!', token:token, username:user?.username, isAdmin:user?.isAdmin })
  }
  catch(err) {
    return res.status(500).json(err)
  }
};



module.exports = sessionController;