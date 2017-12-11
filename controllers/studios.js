const StudioEvent = require('../models/StudioEvent');
const Country = require('../models/Country');

function studioEventsCreate(req, res, next) {    
    Country
        .findOne({ name: new RegExp(req.body.country, "i") })
        .exec()
        .then(country => {
            country.used = true;
            country.save();
            if (req.body.country && country) req.body.country = country.id;
            return StudioEvent
                .create(req.body) 
        })
        .then(studioEvent => {
            res.status(200).json(studioEvent);
        })
        .catch(next);
}

function studiosEventsIndex(req, res, next) {
    StudioEvent
        .find()
        .populate('artists country')
        .exec()
        .then(studiosEvents => res.status(200).json(studiosEvents))
        .catch(next);
}

function studiosEventsShow(req, res, next) {
    StudioEvent
        .findById(req.params.id)
        .populate('artists country')
        .exec()
        .then(studiosEvents => res.status(200).json(studiosEvents))
        .catch(next);
}

module.exports = {
    create: studioEventsCreate,
    index: studiosEventsIndex,
    show: studiosEventsShow
}