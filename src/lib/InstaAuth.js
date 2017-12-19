class InstaAuth {
  static setAccessToken(token) {
    console.log(token);
    return localStorage.setItem('insta_token', token);
  }

  static removeAccessToken() {
    return localStorage.removeItem('access_token');
  }
}

export default InstaAuth;
