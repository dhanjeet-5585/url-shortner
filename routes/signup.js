const express = require('express')
const app = express();
const routes = express.Router();
const { CreateNewUser } = require('../controllers/signup')

routes.post('/', CreateNewUser)

module.exports = routes;