const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/env');
const Account = require('../models/Account');

function secureRoute(req, res, next) {
    if (!req.headers.authorization) return res.unauthorized(); // if the request that is coming does not contain a header with key of authorization, then do not authorize

    const token = req.headers.authorization.replace('Bearer ', ''); // because the verifyAsync method doesn;t want to have the 'Bearer ', I wanna replace it with nothing

    jwt.verifyAsync(token, secret) // if it says that the token is a valid token, it will go to the then returning the payload, otherwise it'll go to the catch;
        .then((payload) => { // here I'm looking for the user
            return Account.findById(payload.userId);
        })
        .then(account => {
            if (!account) return res.unauthorized();
            req.currentUser = account; // now I get my currentUser
            return next();
        })
        .catch(next);
}

module.exports = secureRoute;