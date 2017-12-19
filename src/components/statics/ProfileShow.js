import React from 'react';

// import OAuthButton from '../auth/OAuthButton';
import InstaFeed from './InstaFeed';

class ProfileShow extends React.Component {
  render() {
    return (
      <section>
        {/* <OAuthButton provider="instagram">Connect with Instagram</OAuthButton> */}
        <InstaFeed provider="instagram">Connect with Instagram</InstaFeed>
      </section>
    );
  }
}

export default ProfileShow;
