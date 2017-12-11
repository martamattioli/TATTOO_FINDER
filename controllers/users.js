const User = require('../models/User');
const Country = require('../models/Country');

function usersIndex(req, res, next) {
    User
        .find()
        .populate('residentAt locations.studioEvent residentAt.artists')
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
        .populate('residentAt locations.studioEvent country')
        .exec()
        .then(artists => res.status(200).json(artists))
        .catch(next);
}

function usersShow(req, res, next) {
    User
        .findById(req.params.id)
        .populate('residentAt locations.studioEvent')
        .exec()
        .then(users => {
            if (!users) res.notFound();
            return res.status(200).json(users);
        })
        .catch(next);
}

function userUpdate(req, res, next) {
    Country
        .findOne({ name: new RegExp(req.body.country, "i") })
        .exec()
        .then(country => {
            country.used = true;
            country.save();
            if (req.body.country && country) req.body.country = country._id;
            return User
                .findById(req.params.id)
        })
        .then(user => {
            if (req.body.locations) {
                let countResidentRepetitions = 0;
                const locations = req.body.locations.map(location => {
                    if (location.resident) countResidentRepetitions++;
                    return location.resident;
                });

                if (countResidentRepetitions > 1) {
                    const firstResidentFound = req.body.locations.find(location => location.resident);
                    req.body.locations[req.body.locations.indexOf(firstResidentFound)].resident = false;
                }

                const resident = req.body.locations.find(location => location.resident);
                if (resident) user.residentAt = resident.studioEvent;
            }

            for (const field in req.body) {
                user[field] = req.body[field];
            }

            return user.save();
        })
        .then(user => res.status(200).json(user))
        .catch(next);
}

module.exports = {
    index: usersIndex,
    artistsIndex,
    show: usersShow,
    update: userUpdate
}

// Imagine that you are adding locations: 
// When adding a studio, you check whether you're resident at this studio or not.
// You cannot be resident at multiple studios at once
// Basically if you are resident at a studio, you shouldn't see the options to be resident at another studio...