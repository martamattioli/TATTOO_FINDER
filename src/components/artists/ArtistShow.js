import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Auth from '../../lib/Auth';

import Insta from '../utility/Insta';
import Message from '../elements/messages/Message';
import ActualButton from '../elements/buttons/ActualButton';

import Profile from '../utility/Profile';

class ArtistShow extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: null,
      instaStream: null,
      instaInfo: null,
      photosToShow: 6,
      isArtist: true,
      isEditable: false,
      isAdminLoggedIn: false
    };

    this.closeMsg = this.closeMsg.bind(this);
    this.showMore = this.showMore.bind(this);
    this.showLess = this.showLess.bind(this);
    this.goToProfileEdit = this.goToProfileEdit.bind(this);
  }

  componentDidMount() {
    Axios
      .get(`/api/artists/${this.props.match.params.id}`)
      .then(res => {
        const isAdminLoggedIn = (Auth.isAuthenticated()) ? Auth.getPayload().userId === '5a42045160d7925f053b15d3' : null;
        const isInstaConnected = res.data.instaAccessToken ? true : false;
        this.setState({ artist: res.data, isInstaConnected, isAdminLoggedIn }, () => {
          if (res.data.instaId) {
            Axios.all([
              Axios.get(`https://api.instagram.com/v1/users/${res.data.instaId}/?access_token=${res.data.instaAccessToken}`),
              Axios.get(`https://api.instagram.com/v1/users/${res.data.instaId}/media/recent/?access_token=${res.data.instaAccessToken}`)
            ])
              .then(Axios.spread((artistInfo, artistPhotos) => {
                const instaInfo = { followers: artistInfo.data.data.counts.followed_by, media: artistInfo.data.data.counts.media };

                this.setState({
                  instaStream: artistPhotos.data.data,
                  instaInfo
                });
              }));
          }
        });
      })
      .catch(err => console.log('err', err));
  }

  closeMsg() {
    this.props.history.push({ state: { message: null } });
  }

  showMore() {
    const photosToShow = this.state.photosToShow + 3;
    this.setState({photosToShow});
  }

  showLess() {
    this.setState({ photosToShow: 3 });
  }

  goToProfileEdit() {
    this.props.history.push({
      pathname: '/my-profile',
      state: { userToEdit: this.props.match.params.id }
    });
  }

  render() {
    if (!this.state.artist) return null;
    return (
      <section>
        {this.props.location.state && this.props.location.state.message && <Message
          border="solid 2px black"
          radius="4px"
          margin="10px"
        >{ this.props.location.state.message }
          <Link to="/my-profile">Back</Link>
          <button onClick={this.closeMsg}>Close</button>
        </Message>}
        { Auth.isAuthenticated() &&
          ((this.state.isAdminLoggedIn && !this.state.artist.isClaimed) ||
          Auth.getPayload().userId === this.state.artist.id) && <ActualButton
            onClick={this.goToProfileEdit}
          >EDIT</ActualButton>}
        <Profile
          user={this.state.artist}
          fetchArtist={this.fetchArtist}
          removeLocation={this.removeLocation}
          isArtist={this.state.isArtist}
          isInstaConnected={this.state.isInstaConnected}
          isEditable={this.state.isEditable}
        />
        { this.state.instaInfo && <Insta
          {...this.state}
          showMore={this.showMore}
          showLess={this.showLess}
        />}

      </section>

    );
  }
}

export default ArtistShow;
