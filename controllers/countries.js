const Country = require('../models/Country');

function countryCreate(req, res, next) {
    Country
        .create(req.body)
        .then(country => res.status(200).json(country))
        .catch(next);
}

function countriesIndex(req, res, next) {
    Country
        .find()
        .exec()
        .then(countries => res.status(200).json(countries))
        .catch(next);
}

module.exports = {
    create: countryCreate,
    index: countriesIndex
}