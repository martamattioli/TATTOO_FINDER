import React from 'react';
// import { Link } from 'react-router-dom';

import OAuthButton from '../auth/OAuthButton';

class ArtistShow extends React.Component {
  render() {
    return (
      <section>
        <OAuthButton provider="instagram">Connect with Instagram</OAuthButton>
      </section>

    );
  }
}

export default ArtistShow;
