import queryString from 'query-string';

class OAuth {
  static providers = [{
    name: 'facebook',
    url: '/api/oauth/facebook',
    authEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
    scope: 'email',
    clientId: '1897550793907371'
    // redirect_uri: `${window.location.href}`
  }, {
    name: 'instagram',
    url: '/api/oauth/instagram',
    authEndpoint: 'https://api.instagram.com/oauth/authorize',
    clientId: '8bc0e7af22e545e79e44696b9503ff11',
    response_type: 'code'
    // redirect_uri: 'http://localhost:8000/profile'
  }];

  static getAuthLink(provider) {
    const qs = {
      scope: provider.scope || 'likes',
      client_id: provider.clientId,
      redirect_uri: `${window.location.href}`,
      response_type: provider.response_type
    };

    console.log('querystring', queryString.stringify(qs));

    return `${provider.authEndpoint}?${queryString.stringify(qs)}`;
  }

  static getProvider(providerName) {
    const provider = this.providers.find(provider => provider.name === providerName);
    provider.authLink = this.getAuthLink(provider);
    return provider;
  }
}

export default OAuth;
