const Account = require('../models/Account');
const Artist = require('../models/Artist');

function artistUpdate(req, res, next) {
    Artist
        .findById(req.params.artistId)
        .exec()
        .then(artist => {
            console.log(artist);
            for (const field in req.body) {
                artist[field] = req.body[field]
            }

            return artist.save();
        })
        .then(artist => res.status(200).json(artist))
        // .then(() => {
        //     return Account.findById(req.params.id).populate({
        //         path: '_artist',
        //         populate: { path: 'styles' }
        //     });
        // })
        // .then(account => res.status(200).json(account))
        .catch(next);
}

module.exports = {
    update: artistUpdate
}