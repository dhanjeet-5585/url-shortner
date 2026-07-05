const express = require('express')
const app = express ();
const router = express.Router();
const { ValidateUser} = require('../controllers/login')

router.post('/', ValidateUser)

module.exports = router