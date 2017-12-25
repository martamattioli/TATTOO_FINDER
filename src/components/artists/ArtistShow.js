import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Insta from '../utility/Insta';
import Message from '../elements/messages/Message';

import Profile from '../utility/Profile';

class ArtistShow extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: null,
      isArtist: true
    };

    this.closeMsg = this.closeMsg.bind(this);
  }

  componentDidMount() {
    Axios
      .get(`/api/artists/${this.props.match.params.id}`)
      .then(res => {
        const isInstaConnected = res.data.instaAccessToken ? true : false;
        this.setState({ artist: res.data, isInstaConnected }, () => {
          if (res.data.instaId) {

            Axios.all([
              Axios.get(`https://api.instagram.com/v1/users/${res.data.instaId}/?access_token=${res.data.instaAccessToken}`),
              Axios.get(`https://api.instagram.com/v1/users/${res.data.instaId}/media/recent/?access_token=${res.data.instaAccessToken}`)
            ])
              .then(Axios.spread((artistInfo, artistPhotos) => {
                const instaInfo = { followers: artistInfo.data.data.counts.followed_by, media: artistInfo.data.data.counts.media };
                const artist = Object.assign({}, this.state.artist, {
                  instaStream: artistPhotos.data.data,
                  instaInfo
                });

                this.setState({ artist });
              }));
          }
        });
      })
      .catch(err => console.log('err', err));
  }

  closeMsg() {
    this.props.history.push({ state: { message: null } });
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
        <h1>{`${this.state.artist.username}'s profile`}</h1>
        {/* { this.state.artist.instaInfo && <div>
          <h2>Instagram</h2>
          <Insta
            artist={this.state.artist}
          />
        </div>} */}
        <Profile
          user={this.state.artist}
          fetchArtist={this.fetchArtist}
          removeLocation={this.removeLocation}
          isArtist={this.state.isArtist}
          isInstaConnected={this.state.isInstaConnected}
          isEditable={false}
        />
      </section>

    );
  }
}

export default ArtistShow;
