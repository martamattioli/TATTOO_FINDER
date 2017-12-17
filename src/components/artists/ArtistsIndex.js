import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class ArtistIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      artists: []
    };
  }

  componentDidMount() {
    Axios
      .get('/api/artists')
      .then(res => this.setState({ artists: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <section>
        <h1>Artist index</h1>
        {this.state.artists.map(artist => {
          return (
            <div key={artist.id}>
              <h2>
                <Link to={`/artists/${artist.id}`}>{artist.username}</Link>
              </h2>
            </div>
          );
        })}
      </section>
    );
  }
}

export default ArtistIndex;
