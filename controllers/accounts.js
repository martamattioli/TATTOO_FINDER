const Account = require('../models/Account');

function accountsIndex(req, res, next) {
    Account
        .find()
        .populate('_admin _user _artist')
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