const express = require('express')
const {SignOutUser} = require('../controllers/signout')

const routes = express.Router();

routes.post('/',SignOutUser)

module.exports = routes