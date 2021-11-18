const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, 
        userPut, 
        userPost, 
        userDelete, 
        userPatch } = require('../controllers/user');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get( '/', userGet );

router.put( '/:id', userPut );

router.post( '/', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password must be al least 6 characters').isLength({ min: 6}),
  check('email', 'Email is invalid').isEmail(),
  check('role', 'Role is invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  validateFields,
], userPost );

router.delete( '/', userDelete );

router.patch( '/', userPatch );


module.exports = router;
