import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Auth from '../../lib/Auth';

const Navbar = ({ history }) => {
  function logout(e) {
    e.preventDefault();
    Auth.removeToken();
    history.push('/');
  }

  return(
    <header>
      <Link to="/">Home</Link>
      {' '}
      { !Auth.isAuthenticated() && [
        <Link key={1} to="/register">Register</Link>,
        <span key={2}>{' '}</span>,
        <Link key={3} to="/login">Login</Link>
      ]}
      {' '}
      { Auth.isAuthenticated() && <a href="#" onClick={logout}>Logout</a>}
      {' '}
      { Auth.isAuthenticated() && <Link key={3} to="/my-profile">Manage profile</Link>}
    </header>
  );
};

export default withRouter(Navbar);
