const express = require('express')
const {handleGenerateNewShortURL, handleID} = require('../controllers/url')

const router = express.Router();
router.post('/', handleGenerateNewShortURL);
// router.get('/:id', handleID);

module.exports = router;