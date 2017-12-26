import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Auth from '../../lib/Auth';
import Message from '../elements/messages/Message';

const Navbar = (props) => {
  function logout(e) {
    e.preventDefault();
    Auth.removeToken();
    history.push('/');
  }

  if (props.location.state && props.location.state.message) {
    setTimeout(() => {
      props.history.push({ state: null });
    }, 2000);
  }

  return(
    <header>
      <nav>
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
        { Auth.isAuthenticated() && Auth.getPayload().role === 'artist' && <Link key={3} to="/my-profile">Manage profile</Link>}
      </nav>
      <section>
        {props.location.state && props.location.state.message && <Message
          background={(props.location.state.type === 'success') ? 'green' : 'red'}
          color="white"
          border="solid 2px black"
          radius="4px"
        >{ props.location.state.message }</Message>}
      </section>
    </header>
  );
};

export default withRouter(Navbar);
