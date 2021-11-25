const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

  const token = req.header('x-token');
  
  if(!token){
    return res.status(401).json({
      msg: 'Token is required'
    });
  }

  try {
    // Get Authenticated User
    const { uid } = jwt.verify( token, process.env.SECRETORPUBLICKEY );
    const user = await User.findById(uid);
    // console.log(uid);
    if(!user){
      return res.status(401).json({
        msg: 'Invalid token'
      });
    }

    // Check if the user is active
    if(!user.state) {
      return res.status(401).json({
        msg: 'Invalid token'
      });
    }

    
    req.user = user;

    next();
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: 'Invalid token'
    });
  }
}

module.exports = {
  validateJWT
}