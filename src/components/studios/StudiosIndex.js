import React from 'react';
import Axios from'axios';

import CardItem from '../cards/CardItem';

class StudiosIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      studios: null
    };
  }

  componentDidMount() {
    Axios
      .get('/api/studios')
      .then(res => this.setState({ studios: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.studios);
    return(
      <section>
        { this.state.studios && <div>
          <h1>Check out the studios</h1>
          { this.state.studios.length === 0 && <p>Looks like there are no studios yet!</p>}
          <ul>
            { this.state.studios.map(studio => <CardItem
              key={studio.id}
              studio={ studio }
            />)}
          </ul>
        </div>}
      </section>
    );
  }
}

export default StudiosIndex;
