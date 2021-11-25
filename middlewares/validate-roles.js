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

const hasRole = ( ...rest ) => {
  return (req= request, res = response, next) => {
    // console.log(rest, req.user.role);

    if (!req.user){
      return res.status(500).json({
        msg: 'An attempt was made to verify the role without first validating the token'
      });
    }

    if ( !rest.includes( req.user.role ) ) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${rest}`
      });
    }

    next();
  }
}

module.exports = {
  isAdminRole,
  hasRole
}
