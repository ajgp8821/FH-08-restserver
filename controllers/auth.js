const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async(req = request, res = response) => {

  const { email, password } = req.body;

  try {

    // Check if email exists
    const user = await User.findOne({ email });
    if( !user ) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos -email'
      })
    }

    // Check if user is active
    if( !user.state ) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos -estado: false'
      })
    }

    // Check password
    const validPass = bcryptjs.compareSync( password, user.password );
    if( !validPass ){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos -pass'
      })
    }

    // Generate JWT
    const token = await generateJWT( user.id )

    res.status(200).json({
      user,
      token
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Algo salió mal'
    })
  }

}

const googleSignIn = async(req = request, res = response) => {

  const { id_token } = req.body;

  res.json({
    msg: 'Todo OK',
    id_token
  })
}

module.exports = {
  login,
  googleSignIn
}
