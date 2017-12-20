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
      return User
        .create(req.body);
    })
    .then(user => {
      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '24h' });
      return res.json({ message: `Welcome ${user.username}`, token, user });
    })
    .catch(next);
}

function login(req, res, next) {
  User
    .findOne({ $or: [{ 'username': req.body.name }, { 'email': req.body.name }] })
    .exec()
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) return res.status(401).json({ message: 'Oh man... It seems like you entered some invalid credentials, try again!' });
      const accessToken = user.instaAccessToken ? user.instaAccessToken : null;
      const token = jwt.sign({ userId: user.id, access_token: accessToken }, secret, { expiresIn: '1hr' });

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
  login
};
