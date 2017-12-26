import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import { Grid, Row, Col } from 'react-bootstrap';

import Card from '../elements/divs/Card';
import AbsolutelyPosition from '../elements/divs/AbsolutelyPosition';

class StylesIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      styles: null
    };
  }

  componentDidMount() {
    console.log('mounting');
    Axios
      .get('api/styles')
      .then(res => this.setState({styles: res.data}, () => console.log(this.state)))
      .catch(err => console.log(err));
  }

  render(){
    if (!this.state.styles) return null;
    return (
      <section>
        <Grid>
          <Row>
            { this.state.styles.map(style => <Col sm={4} key={style.id}>
              <Link to={`/styles/${style.id}`}>
                <Card
                  border="solid 4px black"
                  radius="4px"
                  hoverColor="darkerGrey"
                  align="center"
                  style={{position: 'relative'}}
                  background="lightGrey"
                  hover={true}
                  // background={`url(${studio.image[0]})`}
                >
                  <AbsolutelyPosition
                    textAlign="left"
                    bottom="10px"
                    width="100%"
                    background="rgba(255, 255, 255, 0.8)"
                    padding="5px 10px"
                  >
                    <h4 style={{width: '90%'}}>{style.name}</h4>
                    <p>{style.artists.length} artists</p>
                  </AbsolutelyPosition>
                </Card>
              </Link>
            </Col>)}
          </Row>
        </Grid>
      </section>
    );
  }
}

export default StylesIndex;
