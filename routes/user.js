const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, 
        userPut, 
        userPost, 
        userDelete, 
        userPatch } = require('../controllers/user');

const router = Router();

router.get( '/', userGet );

router.put( '/:id', userPut );

router.post( '/', [
  check('email', 'El correo no es válido').isEmail(),
], userPost );

router.delete( '/', userDelete );

router.patch( '/', userPatch );


module.exports = router;
