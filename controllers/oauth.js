const rp = require('request-promise');
const oauth = require('../config/oauth');
const User = require('../models/User');
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
            return User
                .findOne({ $or: [{ email: profile.email }, { facebookId: profile.id }] })
                .then(user => {
                    if (!user) {
                        user = new User({
                            username: profile.name,
                            facebookId: profile.id,
                            image: profile.picture.data.url,
                            email: profile.email
                        });
                    }

                    user.facebookId = profile.id;
                    user.image = profile.picture.data.url;
                    return user.save();
                });
        })
        .then(user => {
            console.log(user);
            const payload = { userId: user.id };
            const token = jwt.sign(payload, secret, { expiresIn: '1hr' });

            return res.json({
                token,
                user,
                message: `Welcome back ${user.username}`
            });
        })
        .catch(next);
}

module.exports = {
    facebook
};