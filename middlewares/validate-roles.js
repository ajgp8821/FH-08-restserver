const { request, response } = require('express');

const isAdminRole = (req= request, res = response, next) => {

  if (!req.user){
    return res.status(500).json({
      msg: 'An attempt was made to verify the role without first validating the token'
    });
  }

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not an administrator`
    });
  }

  next();

}

module.exports = {
  isAdminRole
}
