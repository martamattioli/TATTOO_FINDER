class InstaAuth {
  static setAccessToken(token) {
    console.log('instaToken in Artist Show', token);
    return localStorage.setItem('insta_token', token);
  }

  static removeAccessToken() {
    return localStorage.removeItem('insta_token');
  }
}

export default InstaAuth;
