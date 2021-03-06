import React from 'react';
import Axios from 'axios';

import { Grid, Row, Col } from 'react-bootstrap';

import StudioCard from './StudioCard';
import SelectedText from '../elements/typography/SelectedText';

class StudiosIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      studios: null,
      events: null,
      showStudios: true
    };

    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount() {
    Axios
      .get('/api/studios')
      .then(res => {
        console.log(res.data);
        const studios = res.data.filter(studio => studio.type === 'studio');
        const events = res.data.filter(event => event.type === 'event');
        console.log(studios, events);
        this.setState({studios, events});
      })
      .catch(err => console.log(err));
  }

  toggleShow() {
    this.setState({showStudios: !this.state.showStudios});
  }

  render() {
    if (!this.state.studios) return null;
    return(
      <section>
        <Grid fluid>
          <h1 onClick={this.toggleShow}>
            <SelectedText selected={this.state.showStudios}
            >Browse studios</SelectedText>
            <SelectedText selected={!this.state.showStudios}
            >Browse events</SelectedText>
          </h1>
          { this.state.showStudios && <div>
            <Row>
              {this.state.studios.map(studio => <Col sm={4} key={studio.id}>
                <StudioCard
                  studio={studio}
                />
              </Col>)}
            </Row>
          </div>}
          { !this.state.showStudios && <div>
            <Row>
              {this.state.events.map(event => <Col sm={4} key={event.id}>
                <StudioCard
                  event={event}
                />
              </Col>)}
            </Row>
          </div>}
        </Grid>
      </section>
    );
  }
}

export default StudiosIndex;
