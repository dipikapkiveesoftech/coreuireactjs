'use strict';

const express = require('express');

const userCtrl = require('../controllers/users');
const { authorize } = require('../lib/auth');
const { ADMIN,USER } = require('../constants/roles');

const router = express.Router();

router.route('/')

  // Get List Of Users
  .get(authorize([ADMIN]), userCtrl.getUsers)

  // Create New User
  .post(authorize([ADMIN]), userCtrl.createUser);


router.route('/:id')

  // Get User
  .get(authorize([ADMIN]), userCtrl.getUserById)

  // Update User
  .put(authorize([ADMIN]), userCtrl.updateUser)

  // Delete User
  .delete(authorize(ADMIN), userCtrl.deleteUser);

router.route('/search')

  .get(userCtrl.search);
  
router.route('/login')
  
  .post(userCtrl.loginUser);

module.exports = router;
