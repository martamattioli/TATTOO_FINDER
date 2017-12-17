const rp = require('request-promise');
const oauth = require('../config/oauth');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/env');

function facebook(req, res, next) {
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
              email: profile.email,
              role: 'user'
            });
          }

          user.facebookId = profile.id;
          user.image = profile.picture.data.url;
          return user.save();
        });
    })
    .then(user => {
      // console.log(user);
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

function instagram(req, res, next) {
  console.log('inside instagram');
  rp({
    method: 'POST',
    url: oauth.instagram.accessTokenURL,
    qs: {
      code: req.body.code,
      client_id: oauth.instagram.clientId,
      client_secret: oauth.instagram.clientSecret,
      redirect_uri: req.body.redirectUri
    },
    json: true
  })
    .then((token) => {
      console.log(token);
      // return rp({
      //   method: 'GET',
      //   url: oauth.instagram.profileURL,
      //   qs: token,
      //   json: true
      // });
    })
    // .then(profile => {
    //   console.log(profile);
    //   return User
    //     .findOne({ $or: [{ email: profile.email }, { facebookId: profile.id }] })
    //     .then(user => {
    //       if (!user) {
    //         user = new User({
    //           username: profile.username,
    //           instagramId: profile.id,
    //           image: profile.profile_picture,
    //           email: profile.email,
    //           role: 'user'
    //         });
    //       }
    //
    //       user.instaAccessToken = profile.access_token;
    //       user.instagramId = profile.id;
    //       // user.image = profile.picture.data.url;
    //       return user.save();
    //     });
    // })
    // .then(user => {
    //   // console.log(user);
    //   // const payload = { userId: user.id };
    //   // const token = jwt.sign(payload, secret, { expiresIn: '1hr' });
    //
    //   return res.json({
    //     access_token: user.instaAccessToken,
    //     message: 'Your profile is now connected with Instagram'
    //   });
    // })
    .catch(next);
}

module.exports = {
  facebook,
  instagram
};
