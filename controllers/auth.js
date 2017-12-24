const jwt = require('jsonwebtoken');
const { secret } = require('../config/env');
const User = require('../models/User');
const Country = require('../models/Country');

function register(req, res, next) {
  Country
    .findOne({ name: new RegExp(req.body.country, 'i') })
    .exec()
    .then(country => {
      if (country) {
        country.used = true;
        country.save();
        if (req.body.country && country) req.body.country = country.id;
      }

      if (req.body.role === 'artist') req.body.registrationCode = generateId();

      return User
        .create(req.body);
    })
    .then(user => {
      const token = jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn: '24hr' });
      return res.json({ message: `Welcome ${user.username}`, token, user });
    })
    .catch(next);
}

function generateId() {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function login(req, res, next) {
  User
    .findOne({ $or: [{ 'username': req.body.name }, { 'email': req.body.name }] })
    .exec()
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) return res.status(401).json({ message: 'Oh man... It seems like you entered some invalid credentials, try again!' });

      const accessToken = user.instaAccessToken ? user.instaAccessToken : null;
      const token = jwt.sign({ userId: user.id, access_token: accessToken, role: user.role }, secret, { expiresIn: '24hr' });

      return res.json({ message: `Welcome ${user.username}`, token, user });
    })
    .catch(next);
}

function artistFirstLogin(req, res, next) {
  User
    .findOne({ $or: [{ 'username': req.body.name }, { 'email': req.body.name }] })
    .exec()
    .then(user => {
      if (!user || !user.validatePassword(req.body.password) || (user.role === 'artist' && !req.body.registrationCode)) return res.status(401).json({ message: 'Oh man... It seems like you entered some invalid credentials, try again!' });
      // if () return res.status(401).json({ message: 'It seems like the registration code is incorrect'});

      for (const field in req.body) {
        if (field === 'registrationCode') {
          user[field] = null;
        } else {
          user[field] = req.body[field];
        }
      }

      user.save();

      const accessToken = user.instaAccessToken ? user.instaAccessToken : null;
      const token = jwt.sign({ userId: user.id, access_token: accessToken, role: user.role }, secret, { expiresIn: '24hr' });

      return res.json({ message: `Welcome ${user.username}`, token, user });
    })
    .catch(next);
}

// function createArtist(req, res, next, user) {
//     Artist
//         .create(req.body)
//         .then(artist => {
//             account._artist = artist.id;

//             account.save();

//             const token = jwt.sign({ userId: account.id }, secret, { expiresIn: '1hr' });

//             return res.json({ message: `Welcome ${account.username}`, token, account });
//         })
//         .catch(next);
// }

module.exports = {
  register,
  login,
  artistFirstLogin
};
