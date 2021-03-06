const User = require('../models/User');
const Country = require('../models/Country');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/env');

function usersIndex(req, res, next) {
  User
    .find()
    .populate('locations.studioEvent')
    .exec()
    .then(users => {
      if (!users) res.notFound();
      return res.status(200).json(users);
    })
    .catch(next);
}

function artistsIndex(req, res, next) {
  User
    .find({role: 'artist'})
    .populate('locations.studioEvent country styles')
    .exec()
    .then(artists => {
      res.status(200).json(artists);
    })
    .catch(next);
}

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .populate('styles locations.studioEvent')
    .exec()
    .then(user => {
      if (!user) res.notFound();
      return res.status(200).json(user);
    })
    .catch(next);
}

function artistsShow(req, res, next) {
  User
    .findById(req.params.id)
    .populate('styles locations.studioEvent')
    .exec()
    .then(artist => {
      if (!artist) res.notFound();
      return res.status(200).json(artist);
    })
    .catch(next);
}

function userUpdate(req, res, next) {
  Country
    .findOne({ name: new RegExp(req.body.country, 'i') })
    .exec()
    .then(country => {
      country.used = true;
      country.save();
      if (req.body.country && country) req.body.country = country._id;
      return User
        .findById(req.params.id);
    })
    .then(user => {
      for (const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then(user => res.status(200).json(user))
    .catch(next);
}

function artistAddLocation(req, res, next) {
  console.log('INITIAL REQ BODY', req.body);
  if (req.body.type === 'studio' && req.body.resident && (req.body.startDate || req.body.endDate)) {
    console.log('if is resident');
    delete req.body.startDate;
    delete req.body.endDate;
  } else if (req.body.type === 'event' && req.body.resident) {
    console.log('if it\'s event');
    delete req.body.resident;
  }

  console.log('REQ BODY AFTER HANDLING', req.body);

  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.notFound();
      user.locations.push(req.body);

      return user.save();
    })
    .then(user => res.status(200).json({user}))
    .catch(next);
}

function artistRemoveLocation(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.notFound();

      const location = user.locations.find(location => `${location.id}` === req.params.locationId);

      location.remove();
      return user.save();
    })
    .then(user => res.status(200).json(user))
    .catch(next);
}

function artistsDisconnectInsta(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(artist => {
      if (!artist) res.notFound();
      artist.instaId = null;
      artist.instaAccessToken = null;
      artist.instaUsername = null;
      artist.instaProfilePic = null;

      return artist.save();
    })
    .then(artist => {
      const token = jwt.sign({ userId: artist.id }, secret, { expiresIn: '24h' });
      return res.status(200).json({ message: 'Instagram disconnected', token, artist });
    })
    .catch(next);
}

module.exports = {
  index: usersIndex,
  artistsIndex,
  artistsShow,
  artistsDisconnectInsta,
  show: usersShow,
  update: userUpdate,
  artistAddLocation,
  artistRemoveLocation
};

// Imagine that you are adding locations:
// When adding a studio, you check whether you're resident at this studio or not.
// You cannot be resident at multiple studios at once
// Basically if you are resident at a studio, you shouldn't see the options to be resident at another studio...
