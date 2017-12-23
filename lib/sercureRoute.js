const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/env');
const User = require('../models/User');

function secureRoute(req, res, next) {
  // console.log(req.headers.authorization);
  if (!req.headers.authorization) return res.unauthorized();

  const token = req.headers.authorization.replace('Bearer ', '');

  jwt.verifyAsync(token, secret)
    .then((payload) => {
      return User.findById(payload.userId);
    })
    .then(user => {
      if (!user) return res.unauthorized();
      req.currentUser = user;
      return next();
    })
    .catch(next);
}

module.exports = secureRoute;
