const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
// const { existEmail } = require('../helpers/db-validators');

const userGet = (req = request, res = response) => {

  const { q, name = 'No name', apikey, page = 1, limit } = req.query;

  res.status(200).json({
    ok: true,
    msg: 'get API - controller',
    q,
    name,
    apikey,
    page,
    limit
  });
};

const userPut = async(req, res = response) => {

  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  // TODO: validar email contra DB
  if( password ){
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync( password, salt );
  }

  const user = await User.findByIdAndUpdate(id, rest, {new: true});
  res.status(201).json(user);
};

const userPost = async(req = request, res = response) => {
  
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync( password, salt );
  
  // Guardar en BD

  await user.save();

  res.status(201).json(user);
};

const userDelete = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'delete API - controller'
  });
};

const userPatch = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'patch API - controller'
  });
};

module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch
}
