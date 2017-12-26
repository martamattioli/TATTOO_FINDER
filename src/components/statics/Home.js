import React from 'react';
import { Link } from 'react-router-dom';

import Message from '../elements/messages/Message';

const Home = () => {
  return(
    <section>
      <h1>Tattoo Finder</h1>
      <h2>Search for...</h2>
      <ul>
        <li>
          <Link to="/studios">Studios</Link>
        </li>
        <li>
          <Link to="/artists">Artists</Link>
        </li>
        <li>
          <Link to="/styles">Styles</Link>
        </li>
      </ul>
    </section>
  );
};

export default Home;
