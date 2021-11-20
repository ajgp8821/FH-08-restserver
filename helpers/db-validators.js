const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
  const existRole = await Role.findOne({ role });
  if( !existRole ) {
    throw new Error(`The '${role}' is not registered in the database`);
  }
}

const existEmail = async (email = '') => {
  const emailExist = await User.findOne({ email });
  if ( emailExist ) {
    throw new Error(`Email ${email} is already taken`);
  }
}

module.exports = {
  isValidRole,
  existEmail
}
