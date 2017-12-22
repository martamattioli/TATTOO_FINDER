const rp = require('request-promise');
const oauth = require('../config/oauth');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/env');

function facebook(req, res, next) {
  console.log('in facebook');
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
      const payload = { userId: user.id, role: user.role };
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
  let instaToken;
  if (!req.currentUser.instaId) {
    rp({
      method: 'POST',
      url: 'https://api.instagram.com/oauth/access_token',
      form: {
        grant_type: 'authorization_code',
        code: req.body.code,
        client_id: oauth.instagram.clientId,
        client_secret: oauth.instagram.clientSecret,
        redirect_uri: req.body.redirectUri
      },
      json: true
    })
      .then(token => {
        instaToken = token.access_token;
        // console.log('token!!!!', token);
        return rp({
          method: 'GET',
          url: `https://api.instagram.com/v1/users/self/?access_token=${req.body.code}`,
          qs: token,
          json: true
        });
      })
      .then(profile => {
        return User
          .findById(req.currentUser.id)
          .exec()
          .then(user => {
            if (!user) {
              res.status(404).json({message: 'Artist not found'});
            }

            user.instaAccessToken = instaToken;
            user.instaId = profile.data.id;
            user.instaUsername = profile.data.username;
            user.instaProfilePic = profile.data.profile_picture;
            if (profile.website) user.website = profile.data.website;

            return user.save();
          });
      })
      .then(user => {
        const payload = { userId: user.id, access_token: user.instaAccessToken, role: user.role };
        const token = jwt.sign(payload, secret, { expiresIn: '1hr' });

        return res.json({
          // access_token: user.instaAccessToken,
          token,
          message: 'Your profile is now connected with Instagram, check out how other people see your profile.'
        });
      })
      .catch(next);
  } else {
    console.log('in the else statement');
  }
}

module.exports = {
  facebook,
  instagram
};
