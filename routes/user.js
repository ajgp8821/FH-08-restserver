const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, existEmail } = require('../helpers/db-validators');

const { userGet, 
        userPut, 
        userPost, 
        userDelete, 
        userPatch } = require('../controllers/user');

const router = Router();

router.get( '/', userGet );

router.put( '/:id', userPut );

router.post( '/', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password must be al least 6 characters').isLength({ min: 6}),
  check('email').custom( existEmail ),
  check('role').custom( isValidRole ),
  validateFields,
], userPost );

router.delete( '/', userDelete );

router.patch( '/', userPatch );


module.exports = router;
