const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
const accounts = require('../controllers/accounts');

router.route('/register')
    .post(auth.register);

router.route('/login')
    .post(auth.login);

router.route('/accounts')
    .get(accounts.index);

module.exports = router;