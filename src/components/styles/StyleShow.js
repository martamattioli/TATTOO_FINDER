import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import { Grid, Row, Col } from 'react-bootstrap';

import Circle from '../elements/divs/Circle';
import Card from '../elements/divs/Card';
import ActualButton from '../elements/buttons/ActualButton';

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
              <Card
                border="solid 4px black"
                radius="4px"
                hoverColor="darkerGrey"
                align="center"
                padding="20px"
                style={{position: 'relative'}}
                // onClick={() => this.props.history.push(`/studios/${location.studioEvent.id}`)}
              >
                <Link to={`/artists/${artist.id}`}>
                  <div
                    style={{margin: '0 0 20px 0'}}
                  >
                    <Circle
                      profilePic={artist.instaProfilePic}
                      width={`${size}px`}
                      height={`${size}px`}
                    />
                    <h3>{artist.username}</h3>
                  </div>
                </Link>
                <div>
                  <h3 style={{fontSize: '18px', marginBottom: '10px'}}>Other styles:</h3>
                  {artist.styles.map((style, index) => {
                    console.log(`${style.id}`, `${this.props.match.params.id}`, `${style.id}` === `${this.props.match.params.id}`);
                    return(
                      <ActualButton
                        key={style.id}
                        onClick={() => this.fetchStyle(style.id)}
                        background="black"
                        color="white"
                        fontSize="11px"
                        margin={(index !== (artist.styles.length - 1)) ? '0 5px 5px 0' : '0px'}
                        disabled={`${style.id}` === `${this.props.match.params.id}`}
                      >
                        {style.name}
                      </ActualButton>
                    );
                  })}
                </div>
              </Card>
            </Col>)}
          </Row>
        </Grid>
      </section>
    );
  }
}

export default StyleShow;
