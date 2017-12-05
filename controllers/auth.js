const jwt = require('jsonwebtoken');
const { secret } = require('../config/env');
const Account = require('../models/Account');
const Admin = require('../models/Admin');
const Artist = require('../models/Artist');
const User = require('../models/User');

function register(req, res, next) {
    Account
        .create(req.body)
        .then(account => {
            if (req.body.role === 'artist') {
                createArtist(req, res, next, account);
            } else {
                const token = jwt.sign({ userId: account.id }, secret, { expiresIn: '1hr' });
                return res.json({ message: `Welcome ${account.username}`, token, account });
            } 
        })
        .catch(next);
}

function login(req, res, next) {
    Account
        .findOne({ $or: [{ 'username': req.body.username }, { 'email': req.body.email }] })
        .exec()
        .then(account => {
            if (!account || !account.validatePassword(req.body.password)) return res.status(401).json({ message: 'Incorrect Credentials' });

            const token = jwt.sign({ userId: account.id }, secret, { expiresIn: '1hr' });

            return res.json({ message: `Welcome ${account.username}`, token, account });
        })
        .catch(next);
}

// function createAdmin(req, res, next, account) {
//     Admin
//         .create(req.body)
//         .then(admin => {
//             console.log(admin);

//             account._admin = admin.id;
//             // account.password = req.body.password;
//             // account.passwordConfirmation = req.body.passwordConfirmation;

//             account.save();

//             const token = jwt.sign({ userId: account.id }, secret, { expiresIn: '1hr' });

//             return res.json({ message: `Welcome ${account.username}`, token, account });
//         })
//         .catch(next);
// }

function createArtist(req, res, next, account) {
    Artist
        .create(req.body)
        .then(artist => {
            account._artist = artist.id;

            account.save();

            const token = jwt.sign({ userId: account.id }, secret, { expiresIn: '1hr' });

            return res.json({ message: `Welcome ${account.username}`, token, account });
        })
        .catch(next);
}

// function createUser(req, res, next, account) {
//     User
//         .create(req.body)
//         .then(user => {
//             account._user = user.id;
//             // account.password = req.body.password;
//             // account.passwordConfirmation = req.body.passwordConfirmation;

//             account.save();


//             const token = jwt.sign({ userId: account.id }, secret, { expiresIn: '1hr' });

//             return res.json({ message: `Welcome ${account.username}`, token, account });
//         })
//         .catch(next);
// }

module.exports = {
    register,
    login
}