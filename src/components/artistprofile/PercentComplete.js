import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import RoundedDiv from '../elements/divs/RoundedDiv';
import Button from '../elements/buttons/Button';

const PercentageComplete = ({ percent, artistId }) => {
  return (
    <RoundedDiv
      margin="30px 0"
    >
      <Grid fluid>
        <Row>
          <Col xs={6} sm={6} md={6}>
            <p className="percent-p">{percent}% profile completed</p>
          </Col>
          <Col xs={6} sm={6} md={6} className="percent-right">
            <Button
              to={`/artists/${artistId}`}
              margin="5px"
            >Preview your profile</Button>
          </Col>
        </Row>
      </Grid>
    </RoundedDiv>
  );
};

export default PercentageComplete;
