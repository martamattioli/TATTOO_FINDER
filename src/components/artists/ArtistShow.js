import React from 'react';
import Axios from 'axios';

class ArtistShow extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: null
    };

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

              this.setState({ artist }, () => console.log('state after getting insta data', this.state));
            }));
        });
      })
      .catch(err => console.log('err', err));
  }

  render() {
    if (!this.state.artist) return null;
    return (
      <section>
        <h1>{`${this.state.artist.username}'s profile`}</h1>
        {this.state.artist.instaInfo && [
          <h2 key={0}>Instagram Feed 
            <span>{this.state.artist.instaInfo.followers} followers</span>,
            <span>{this.state.artist.instaInfo.media} photos</span>
          </h2>
        ]}
        { this.state.artist.instaStream && this.state.artist.instaStream.map(photo => {
          const dateCreated = Date(photo.created_time);
          return (
            <div key={photo.id}>
              <img className="insta-stream" src={photo.images.standard_resolution.url} />
              <p>{photo.likes.count} likes</p>
              <p>{dateCreated}</p>
              {/* <a target="_blank" href={photo.link}></a> */}
            </div>
          );
        })}
      </section>

    );
  }
}

export default ArtistShow;
