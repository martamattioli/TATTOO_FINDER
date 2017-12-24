import React from 'react';
import Axios from 'axios';

import ShowCard from '../elements/divs/ShowCard';
import { Grid, Row, Col } from 'react-bootstrap';

import ArtistCard from '../artists/ArtistCard';
import CoverPhoto from '../elements/divs/CoverPhoto';
import AbsolutelyPosition from '../elements/divs/AbsolutelyPosition';
import FlagIcon from '../elements/icons/FlagIcon';

class StudioShow extends React.Component {
  constructor() {
    super();

    this.state = {
      studio: null
    };
  }

  componentDidMount() {
    Axios
      .get(`/api/studios/${this.props.match.params.id}`)
      .then(res => this.setState({ studio: res.data }, () => console.log(this.state)))
      .catch(err => console.log(err));
  }


  render() {
    if (!this.state.studio) return null;
    const size = 100;
    return(
      <section>
        <Grid fluid>
          <ShowCard>
            <CoverPhoto
              background="https://static1.squarespace.com/static/57a236d4d482e929fb22688d/57a38b25414fb54f51f2dca4/57a38c4ab3db2b452529c060/1470336076803/Safe+House-7.jpg"
            >
              <AbsolutelyPosition
                bottom="40px"
                left="0"
                background="rgba(255, 255, 255, 0.8)"
                textAlign="left"
                width="100%"
                padding="20px"
              >
                <h1>{this.state.studio.name} <FlagIcon
                  width="50px"
                  height="25px"
                  background={this.state.studio.country.flag}
                ></FlagIcon>
                </h1>
                <p>{this.state.studio.averageRatings}</p>
              </AbsolutelyPosition>
            </CoverPhoto>
            <Row>
              {this.state.studio.artists.map(artist => <Col sm={4} key={artist.id}>
                <ArtistCard
                  artist={artist}
                  thisStyleId={this.props.match.params.id}
                  size={size}
                />
              </Col>)}
            </Row>
          </ShowCard>
        </Grid>
      </section>
    );
  }
}

export default StudioShow;
