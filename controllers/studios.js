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
    console.log('hit studios index');
    StudioEvent
        .find()
        .populate('artists country')
        .exec()
        .then(studiosEvents => {
            console.log(studiosEvents);
            res.status(200).json(studiosEvents);
        })
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

function studiosEventsDelete(req, res, next) {
    StudioEvent
        .findByIdAndRemove(req.params.id)
        .then(() => res.status(200).json({ message: 'Deleted' }))
        .catch(next);
}

module.exports = {
    create: studioEventsCreate,
    index: studiosEventsIndex,
    show: studiosEventsShow,
    delete: studiosEventsDelete
}