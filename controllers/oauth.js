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
  let instaToken;

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
      instaToken = `${token}`;
      console.log('token!!!!', token);
      return rp({
        method: 'GET',
        url: `https://api.instagram.com/v1/users/self/?access_token=${req.body.code}`,
        qs: token,
        json: true
      });
    })
    .then(profile => {
      console.log('profile!!', profile);
      return User
        .findById(req.currentUser.id)
        .exec()
        // .findOne({ $or: [{ email: profile.email }, { facebookId: profile.id }] })
        .then(user => {
          if (!user) {
            res.status(404).json({message: 'Artist not found'});
          }

          console.log('the USERRRRR', user);
          user.instaAccessToken = instaToken;
          user.instaId = profile.id;
          user.instaUsername = profile.username;
          user.instaProfilePic = profile.profile_picture;
          if (profile.website) user.website = profile.website;

          return user.save();
        });
    })
    .then(user => {
      console.log(user,'!!!');

      // const payload = { userId: user.id };
      // const token = jwt.sign(payload, secret, { expiresIn: '1hr' });

      return res.json({
        access_token: user.instaAccessToken,
        // token,
        message: 'Your profile is now connected with Instagram'
      });
    })
    .catch(next);
}

module.exports = {
  facebook,
  instagram
};
