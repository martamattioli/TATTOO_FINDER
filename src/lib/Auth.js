class Auth {
  static setToken(token) {
    return localStorage.setItem('token', token);
  }
}

export default Auth;
