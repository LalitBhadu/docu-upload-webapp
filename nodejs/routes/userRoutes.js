const express = require('express');
const { createUsers } = require('../controllers/userContrlr.js');

const router = express.Router();

router.post('/users', createUsers);

module.exports = router;
