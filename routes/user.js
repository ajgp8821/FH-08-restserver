const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { isValidRole, existEmail, existUserById } = require('../helpers/db-validators');

const { userGet, 
        userPut, 
        userPost, 
        userDelete, 
        userPatch } = require('../controllers/user');

const router = Router();

router.get( '/', userGet );

router.put( '/:id', [
  check('id', 'Is not a valid ID').isMongoId(),
  check('id').custom( existUserById ),
  check('role').custom( isValidRole ),
  validateFields,
], userPut );

router.post( '/', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password must be al least 6 characters').isLength({ min: 6}),
  check('email').custom( existEmail ),
  check('role').custom( isValidRole ),
  validateFields,
], userPost );

router.delete( '/:id', [
  validateJWT,
  check('id', 'Is not a valid ID').isMongoId(),
  check('id').custom( existUserById ),
  validateFields,
],userDelete );

router.patch( '/', userPatch );


module.exports = router;
