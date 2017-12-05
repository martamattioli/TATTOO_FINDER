const rp = require('request-promise');
const oauth = require('../config/oauth');
const Account = require('../models/Account');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/env');


function facebook(req, res, next) {
    console.log(req.body);
    
    return rp({
        method: 'POST',
        url: oauth.facebook.accessTokenURL,
        qs: {
            code: req.body.code,
            client_id: oauth.facebook.clientId,
            client_secret: oauth.facebook.clientSecret,
            redirect_uri: req.body.redirectUri
        },
        json: true
    })
        .then((token) => {
            console.log(token);
            
            return rp({
                method: 'GET',
                url: oauth.facebook.profileURL,
                qs: token,
                json: true
                // headers: {
                //     'User-Agent': 'Request-Promise'
                // }
            });
        })
        .then(profile => {
            return Account
                .findOne({ $or: [{ email: profile.email }, { facebookId: profile.id }] })
                .then(account => {
                    if (!account) {
                        account = new Account({
                            username: profile.name,
                            facebookId: profile.id,
                            image: profile.picture.data.url,
                            email: profile.email
                        });
                    }

                    account.facebookId = profile.id;
                    account.image = profile.picture.data.url;
                    return account.save();
                });
        })
        .then(account => {
            console.log(account);
            const payload = { userId: account.id };
            const token = jwt.sign(payload, secret, { expiresIn: '1hr' });

            return res.json({
                token,
                user,
                message: `Welcome back ${account.username}`
            });
        })
        .catch(next);
}

module.exports = {
    facebook
};