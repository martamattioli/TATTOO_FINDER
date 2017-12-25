import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import { Grid, Row, Col } from 'react-bootstrap';

import ArtistCard from '../artists/ArtistCard';

class StyleShow extends React.Component {
  constructor() {
    super();
    this.state = {
      style: null
    };
  }

  componentDidMount() {
    this.fetchStyle(this.props.match.params.id);
  }

  fetchStyle(id) {
    Axios
      .get(`/api/styles/${id}`)
      .then(res => {
        this.props.history.push(`/styles/${id}`);
        this.setState({style: res.data}, () => console.log(this.state));
      })
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.style) return null;
    const size = 100;
    return (
      <section>
        <Grid fluid>
          <h1>{ this.state.style.name } TATTOOS</h1>
          <Row>
            { this.state.style.artists.map(artist => <Col md={4} key={artist.id}>
              <ArtistCard
                artist={artist}
                thisResourceId={this.props.match.params.id}
                size={size}
              />
            </Col>)}
          </Row>
        </Grid>
      </section>
    );
  }
}

export default StyleShow;
