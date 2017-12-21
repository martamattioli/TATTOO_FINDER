import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Auth from '../../lib/Auth';

import InstaOauthButton from '../auth/InstaOauthButton';
import SuccessMessage from '../elements/messages/SuccessMessage';
// import Insta from './Insta';

class ArtistProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: Auth.getPayload().userId,
      user: null,
      isArtist: false,
      isInstaConnected: false
    };
    this.disconnectInsta = this.disconnectInsta.bind(this);
    this.closeMsg = this.closeMsg.bind(this);
  }

  componentDidMount() {
    Axios
      .get(`/api/users/${this.state.userId}`)
      .then(res => {
        this.doChecks(res);
      })
      .catch(err => console.log(err));
  }

  doChecks(res) {
    const isArtist = (res.data.role === 'artist') ? true : false;
    const isInstaConnected = res.data.instaAccessToken ? true : false;
    this.setState({ user: res.data, isArtist, isInstaConnected }, () => {
      // if (this.state.isInstaConnected) {
      //   Axios.all([
      //     Axios.get(`https://api.instagram.com/v1/users/self/?access_token=${Auth.getPayload().access_token}`),
      //     Axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${Auth.getPayload().access_token}`)
      //   ])
      //     .then(Axios.spread((artistInfo, artistPhotos) => {
      //       console.log(artistInfo, artistPhotos);
      //       const instaInfo = { followers: artistInfo.data.data.counts.followed_by, media: artistInfo.data.data.counts.media };
      //       const user = Object.assign({}, this.state.user, {
      //         instaStream: artistPhotos.data.data,
      //         instaInfo
      //       });
      //
      //       this.setState({ user }, () => console.log('IN PROFILE OPTIONS', this.state));
      //     }));
      // }
    });
  }

  disconnectInsta() {
    Axios
      .put(`/api/artists/${this.state.userId}/disconnectinsta`, {}, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => {
        Auth.setToken(res.data.token);
        this.setState({
          user: res.data.artist,
          message: res.data.message,
          isArtist: true,
          isInstaConnected: false
        });
        // this.doChecks(res);
      })
      .catch(err => console.log('err', err));
  }

  closeMsg() {
    setTimeout(() => {
      this.setState({ message: null });
    }, 2000);
  }

  render() {
    if (!this.state.user) return null;
    if (this.state.message) this.closeMsg();
    return (
      <section>
        {this.state.message && <SuccessMessage>
          { this.state.message }
        </SuccessMessage>}
        <h1>Manage your profile</h1>
        <Link to={`/artists/${Auth.getPayload().userId}`}>Preview public profile</Link>
        <h2>Personal Details:</h2>
        <p>Username: { this.state.user.username }</p>
        <p>Email: { this.state.user.email }</p>
        { Auth.isAuthenticated() && <Link to={`/users/${ this.state.userId }/edit`}>EDIT</Link>}
        <h2>Photos:</h2>
        {/* { this.state.user.instaInfo && <Insta
          artist={this.state.user}
        />} */}
        { this.state.isArtist && [
          <div key={0}>
            { !this.state.isInstaConnected && <InstaOauthButton provider="instagram">Connect with Instagram</InstaOauthButton> }
            { this.state.isInstaConnected && <div>
              <p>Your profile is connected to Instagram</p>
              <button onClick={ this.disconnectInsta }>Disconnect from Instagram</button>
            </div>}
          </div>
        ]}
      </section>
    );
  }
}

export default ArtistProfile;
