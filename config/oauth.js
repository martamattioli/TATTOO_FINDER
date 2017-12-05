module.exports = {
    facebook: {
        loginURL: 'https://www.facebook.com/v2.11/dialog/oauth?',
        accessTokenURL: 'https://graph.facebook.com/v2.11/oauth/access_token?',
        profileURL: 'https://graph.facebook.com/v2.5/me?fields=id,email,name,picture',
        clientId: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        scope: 'user:email'
    }
};