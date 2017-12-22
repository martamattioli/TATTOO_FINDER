import React from 'react';
import Axios from 'axios';

import MultiSelect from '../utility/MultiSelect';

class StyleNew extends React.Component {
  constructor() {
    super();

    this.state = {
      styles: [],
      removeSelected: true,
      value: [],
      stayOpen: false
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    Axios
      .get('/api/styles')
      .then(res => {
        const styles = res.data.map(style => {
          return { label: style.name, value: style.name, id: style.id };
        });
        this.setState({ styles });
      })
      .catch(err => console.log('error', err));
  }

  handleSelectChange(value) {
    this.setState({value});
  }

  render() {
    return (
      <section>
        <h1>Style New</h1>
        <MultiSelect
          handleSelectChange={this.handleSelectChange}
          {...this.state}
        />
      </section>
    );
  }
}

export default StyleNew;
