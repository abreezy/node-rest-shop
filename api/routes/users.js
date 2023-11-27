// required imports 
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const UsersController = require('../controllers/user'); // importing users controller

// POST method to create new users
router.post('/signup', UsersController.user_signup);

// Handle incoming POST requests to /login page 
router.post('/login', UsersController.user_login);

// Handle incoming DELETE requests to /users with specified user ID
router.delete('/:userID', checkAuth, UsersController.user_delete);

// exporting products function
module.exports = router;