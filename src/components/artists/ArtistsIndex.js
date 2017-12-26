import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Axios from 'axios';

import ArtistCard from './ArtistCard';

class ArtistIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      artists: null
    };
  }

  componentDidMount() {
    Axios
      .get('/api/artists')
      .then(res => this.setState({ artists: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.artists) return null;
    return (
      <section>
        <Grid fluid>
          <h1>Browse Artists</h1>
          <Row>
            {this.state.artists.map(artist => <Col key={artist.id} sm={4}>
              <ArtistCard
                artist={artist}
                size="small"
                thisResourceId={this.props.match.params.id}
                linkToStyle={true}
              />
            </Col>)}
          </Row>
        </Grid>
      </section>
    );
  }
}

export default ArtistIndex;
