const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
// const { existEmail } = require('../helpers/db-validators');

const userGet = async(req = request, res = response) => {

  const { limit = 5, desde = 0 } = req.query;
  const query = { state: true };

  const [ total, users ] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
    .skip(Number(desde))
    .limit(Number(limit))
  ]);

  res.status(200).json({
    total,
    users
  });
};

const userPut = async(req = request, res = response) => {

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

const userDelete = async(req = request, res = response) => {
  
  const { id } = req.params;

  // Borrar físicamente
  // const user = await User.findByIdAndDelete( id );

  const user = await User.findByIdAndUpdate(id, {state: false}, {new: true});

  res.status(200).json({
    user
  });
};

const userPatch = (req = request, res = response) => {
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
