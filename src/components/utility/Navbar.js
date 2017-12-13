import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return(
    <header>
      <Link to="/">Home</Link>
      {' '}
      <Link to="/register">Register</Link>
      {' '}
      <Link to="/login">Login</Link>
    </header>
  );
};

export default Navbar;
