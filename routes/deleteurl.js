const express = require('express');
const routes = express.Router();
const { checkForAuthentication } = require('../middleware/auth');
const { DeleteUserUrl } = require('../controllers/deleteurl.js'); // Import the controller

// Attach the controller function right after the authentication middleware
routes.delete('/:id', checkForAuthentication, DeleteUserUrl); 

module.exports = routes;
