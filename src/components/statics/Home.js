import React from 'react';
import { Link } from 'react-router-dom';

import WelcomeMessage from '../elements/messages/WelcomeMessage';

const Home = (props) => {
  console.log(props);
  if (props.location.state.message) {
    setTimeout(() => {
      props.history.push({ state: { message: null } });
    }, 2000);
  }

  return(
    <section>
      {props.location.state.message && <WelcomeMessage>{ props.location.state.message }</WelcomeMessage>}
      <h1>Tattoo Finder</h1>
      <h2>Search for...</h2>
      <ul>
        <li>
          <Link to="/studios">Studios</Link>
        </li>
        <li>Artists</li>
        <li>Styles</li>
      </ul>
    </section>
  );
};

export default Home;
