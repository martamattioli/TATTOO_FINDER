const Registration = require('../models/Registration');

function registrationsIndex(req, res, next) {
  Registration
    .find()
    .exec()
    .then(registrations => res.status(200).json(registrations))
    .catch(next);
}

module.exports = {
  index: registrationsIndex
};
