import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Insta from '../utility/Insta';
import InstaMessage from '../elements/messages/InstaMessage';

class ArtistShow extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: null
    };

    this.closeMsg = this.closeMsg.bind(this);
  }

  componentDidMount() {
    Axios
      .get(`/api/artists/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ artist: res.data }, () => {
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
        {this.props.location.state && this.props.location.state.message && <InstaMessage>{ this.props.location.state.message }
          <Link to="/options">Back</Link>
          <button onClick={this.closeMsg}>Close</button>
        </InstaMessage>}
        <h1>{`${this.state.artist.username}'s profile`}</h1>
        <h2>Instagram</h2>
        { this.state.artist.instaInfo && <Insta
          artist={this.state.artist}
        />}
      </section>

    );
  }
}

export default ArtistShow;
