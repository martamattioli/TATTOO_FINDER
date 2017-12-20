import React from 'react';
import { Link } from 'react-router-dom';

import SuccessMessage from '../elements/messages/SuccessMessage';

const Home = (props) => {
  if (props.location.state && props.location.state.message) {
    setTimeout(() => {
      props.history.push({ state: { message: null } });
    }, 2000);
  }

  return(
    <section>
      {props.location.state && props.location.state.message && <SuccessMessage>{ props.location.state.message }</SuccessMessage>}
      <h1>Tattoo Finder</h1>
      <h2>Search for...</h2>
      <ul>
        <li>
          <Link to="/studios">Studios</Link>
        </li>
        <li>
          <Link to="/artists">Artists</Link>
        </li>
        <li>Styles</li>
      </ul>
    </section>
  );
};

export default Home;
