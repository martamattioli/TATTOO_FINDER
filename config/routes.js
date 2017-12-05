const express = require('express');
const router = express.Router();

const secureRoute = require('../lib/sercureRoute');

const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const accounts = require('../controllers/accounts');
const artists = require('../controllers/artists');
const ratings = require('../controllers/ratingsReviews');
const styles = require('../controllers/styles');

router.route('/register')
    .post(auth.register);

router.route('/login')
    .post(auth.login);

router.route('/oauth/facebook')
    .post(oauth.facebook);

router.route('/accounts')
    .get(accounts.index);

// router.route('/accounts/:id')
//     .put(accounts.update);

router.route('/accounts/:id/artists/:artistId')
    .put(artists.update);

router.route('/accounts/:id/reviews')
    .post(secureRoute, ratings.accountRatingCreate);

router.route('/styles')
    .get(styles.index)
    .post(styles.create);

module.exports = router;