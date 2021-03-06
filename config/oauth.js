module.exports = {
  facebook: {
    loginURL: 'https://www.facebook.com/v2.11/dialog/oauth?',
    accessTokenURL: 'https://graph.facebook.com/v2.11/oauth/access_token?',
    profileURL: 'https://graph.facebook.com/v2.5/me?fields=id,email,name,picture.height(961)',
    clientId: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    scope: 'user:email'
  },
  instagram: {
    loginURL: `https://api.instagram.com/oauth/authorize/?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri='http://localhost:8000/profile'&response_type=code`,
    accessTokenURL: 'https://api.instagram.com/oauth/access_token',
    profileURL: 'https://api.instagram.com/v1/users/self/?access_token=ACCESS-TOKEN',
    clientId: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    scope: 'user:email'
  }
};
