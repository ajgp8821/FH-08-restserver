const { response, request } = require('express');
const User = require('../models/user');

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

const userPut = (req, res = response) => {

  const { id } = req.params;

  res.status(201).json({
    ok: true,
    msg: 'put API - controller',
    id
  });
};

const userPost = async(req, res = response) => {
  
  const body = req.body;
  const user = new User(body);

  await user.save();

  res.status(201).json({
    ok: true,
    msg: 'post API - controller',
    user
  });
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
