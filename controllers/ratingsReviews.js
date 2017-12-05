const Account = require('../models/Account');
const Rating = require('../models/Rating');

function accountRatingCreate(req, res, next) {
    Account
        .findById(req.params.id)
        .exec()
        .then(account => {
            if (!account) return res.status(404).json({ message: 'Errm... not found' });
            req.body.createdBy = req.currentUser;
            account.ratingsReviews.push(req.body);

            return account.save();
        })
        .then(account => res.status(200).json(account))
        .catch(next);
    
}

module.exports = {
    accountRatingCreate
}