const express = require('express');
const router = express.Router();

const secureRoute = require('../lib/sercureRoute');
const imageUpload = require('../lib/imageUpload');

const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const users = require('../controllers/users');
const ratings = require('../controllers/ratingsReviews');
const styles = require('../controllers/styles');
const studios = require('../controllers/studios');
const countries = require('../controllers/countries');
const registrations = require('../controllers/registrations');

router.route('/register')
  .post(imageUpload, auth.register);

router.route('/login')
  .post(auth.login);

router.route('/loginartist')
  .post(auth.artistFirstLogin);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.route('/oauth/instagram')
  .post(secureRoute, oauth.instagram);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update);

router.route('/users/:id/reviews')
  .post(secureRoute, ratings.userRatingCreate);

router.route('/artists')
  .get(users.artistsIndex);

router.route('/artists/:id')
  .get(users.artistsShow);

router.route('/artists/:id/disconnectinsta')
  .put(secureRoute, users.artistsDisconnectInsta);

router.route('/artists/:id/locations')
  .post(secureRoute, users.artistAddLocation);

router.route('/artists/:id/locations/:locationId')
  .delete(secureRoute, users.artistRemoveLocation);

router.route('/styles')
  .get(styles.index)
  .post(styles.create);

router.route('/styles/:id')
  .get(styles.show);

router.route('/studios')
  .get(studios.index)
  .post(studios.create);

router.route('/studios/:id')
  .get(studios.show)
  .delete(studios.delete);

router.route('/countries')
  .get(countries.index)
  .post(countries.create);

router.route('/registrations')
  .get(registrations.index);

module.exports = router;
