import React from 'react';
import { Link } from 'react-router-dom';
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
    this.fetchStyle = this.fetchStyle.bind(this);
  }

  componentDidMount() {
    Axios
      .get(`/api/studios/${this.props.match.params.id}`)
      .then(res => this.setState({ studio: res.data }))
      .catch(err => console.log(err));
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
    if (!this.state.studio) return null;
    return(
      <section>
        <Grid fluid>
          <ShowCard>
            <CoverPhoto
              background={this.state.studio.image[0] || 'https://static1.squarespace.com/static/57a236d4d482e929fb22688d/57a38b25414fb54f51f2dca4/57a38c4ab3db2b452529c060/1470336076803/Safe+House-7.jpg'}
            >
              <AbsolutelyPosition
                bottom="40px"
                left="0"
                background="rgba(255, 255, 255, 0.8)"
                textAlign="left"
                width="100%"
                padding="20px"
              >
                <h1>{this.state.studio.name} <Link
                  to={`/countries/${this.state.studio.country.id}`}
                >
                  <FlagIcon
                    width="50px"
                    height="25px"
                    background={this.state.studio.country.flag}
                    hover={true}
                  ></FlagIcon>
                </Link>
                </h1>
                <h2
                  style={{marginTop: '10px'}}
                >Average ratings: { this.state.studio.averageRatings > 0 &&
                  <span>{this.state.studio.averageRatings}</span> ||
                  <span>n/a</span>}
                </h2>
              </AbsolutelyPosition>
            </CoverPhoto>
            { this.state.studio.artists.length > 0 && <Row style={{margin: '20px auto'}}>
              <Col xs={12}>
                <h3 style={{margin: '20px auto'}}>Artists:</h3>
              </Col>
              {this.state.studio.artists.map(artist => <Col sm={4} key={artist.id}>
                <ArtistCard
                  artist={artist}
                  inStudios={true}
                  thisResourceId={this.props.match.params.id}
                  linkToStyle={true}
                  size="small"
                />
              </Col>)}
            </Row>}
          </ShowCard>
        </Grid>
      </section>
    );
  }
}

export default StudioShow;
