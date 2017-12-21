import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import RoundedDiv from '../elements/divs/RoundedDiv';
import Button from '../elements/buttons/Button';

const PercentageComplete = ({ percent, artistId }) => {
  return (
    <RoundedDiv>
      <Grid fluid>
        <Row>
          <Col sm={6} md={6}>
            <p className="percent-p">{percent}% profile completed</p>
          </Col>
          <Col sm={6} md={6} className="percent-right">
            <Button to={`/artists/${artistId}`}>Preview your profile</Button>
          </Col>
        </Row>
      </Grid>
    </RoundedDiv>
  );
};

export default PercentageComplete;
