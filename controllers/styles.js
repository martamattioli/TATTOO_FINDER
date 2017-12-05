const Style = require('../models/Style');

function styleCreate(req, res, next) {
    console.log('hit', req.body);
    Style
        .create(req.body)
        .then(style => res.status(200).json(style))
        .catch(next);
}

function stylesIndex(req, res, next) {
    console.log('stylesIndex hit');
    
    Style
        .find()
        .exec()
        .then(styles => {
            console.log('found all the styles');
            
            return res.status(200).json(styles);
        })
        .catch(next);
}

module.exports = {
    create: styleCreate,
    index: stylesIndex
}