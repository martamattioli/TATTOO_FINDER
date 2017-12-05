const Account = require('../models/Account');

function accountsIndex(req, res, next) {
    Account
        .find()
        .populate({
            path: '_artist', 
            populate: { path: 'styles' }
        })
        .exec()
        .then(accounts => {
            if (!accounts) res.notFound();
            return res.status(200).json(accounts);
        })
        .catch(next);
}

module.exports = {
    index: accountsIndex
}