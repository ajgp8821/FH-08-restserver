const { response } = require('express');

const userGet = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'get API - controller'
  });
};

const userPut = (req, res = response) => {
  res.status(201).json({
    ok: true,
    msg: 'put API - controller'
  });
};

const userPost = (req, res = response) => {
  res.status(201).json({
    ok: true,
    msg: 'post API - controller'
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
