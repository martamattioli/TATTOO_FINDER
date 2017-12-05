const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const accounts = require('../controllers/accounts');
const styles = require('../controllers/styles');

router.route('/register')
    .post(auth.register);

router.route('/login')
    .post(auth.login);

router.route('/oauth/facebook')
    .post(oauth.facebook);

router.route('/accounts')
    .get(accounts.index);

router.route('/styles')
    .get(styles.index)
    .post(styles.create);

module.exports = router;