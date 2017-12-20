import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Auth from '../../lib/Auth';

// import OAuthButton from '../auth/OAuthButton';
import InstaFeed from './InstaFeed';

class ProfileOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: Auth.getPayload().userId,
      user: null,
      isArtist: false,
      isInstaConnected: false
    };
  }

  componentDidMount() {
    console.log(Auth.getPayload());
    Axios
      .get(`/api/users/${this.state.userId}`)
      .then(res => {
        this.doChecks(res);
      })
      .catch(err => console.log(err));
  }

  doChecks(res) {
    console.log('in do checks');
    const isArtist = (res.data.role === 'artist') ? true : false;
    const isInstaConnected = res.data.instaAccessToken ? true : false;
    // if (res.data.instaAccessToken)
    this.setState({ user: res.data, isArtist, isInstaConnected }, () => {
      // Axios
      //   .get(z)
    });
  }

  disconnectInsta() {
    Axios
      .put(`/api/artists/${this.state.userId}/disconnectinsta`, {}, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => {
        Auth.setToken(res.data.token);
        this.doChecks(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.user) return null;
    return (
      <section>
        <h1>Manage your profile</h1>
        <h2>Your info:</h2>
        <h3>Personal Details:</h3>
        <p>Username: {this.state.user.username}</p>
        { Auth.isAuthenticated() && <Link to={`/artists/${this.state.userId}/edit`}>EDIT</Link>}
        <h3>Photos:</h3>
        { this.state.isArtist && !this.state.isInstaConnected && <InstaFeed provider="instagram">Connect with Instagram</InstaFeed>}
        { this.state.isArtist && this.state.isInstaConnected && <div>
          <p>Your profile is connected to Instagram</p>
          <button onClick={this.disconnectInsta}>Disconnect from Instagram</button>
        </div>}
      </section>
    );
  }
}

export default ProfileOptions;
