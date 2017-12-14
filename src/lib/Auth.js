class Auth {
  static setToken(token) {
    return localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static removeToken() {
    return localStorage.removeItem('token');
  }
}

export default Auth;
