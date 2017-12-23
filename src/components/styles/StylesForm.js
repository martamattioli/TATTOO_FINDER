import React from 'react';
import Axios from 'axios';

import TickSubmitButton from '../elements/formElements/TickSubmitButton';
import MultiSelect from '../utility/MultiSelect';

class StylesForm extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: {},
      styles: [],
      removeSelected: true,
      value: [],
      stayOpen: false
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Axios
      .get('/api/styles')
      .then(res => {
        const styles = res.data.map(style => {
          return { label: style.name, value: style.name, id: style.id };
        });
        const value = this.props.artist.styles.map(style => {
          return { label: style.name, value: style.name, id: style.id };
        });
        this.setState({ styles, value });
      })
      .catch(err => console.log('error', err));
  }

  handleSelectChange(value) {
    this.setState({value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const userStyles = this.state.value.map(style => style.id);
    const artist = Object.assign({}, this.state.artist, { styles: userStyles });
    this.setState({ artist }, () => {
      Axios
        .put(`/api/users/${this.props.artist.id}`, this.state.artist)
        .then(() => {
          this.props.fetchArtist();
          this.props.showForm('showStylesForm');
        })
        .catch(err => this.setState({ errors: err.response.data.errors }));
    });
  }

  render() {
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <MultiSelect
            handleSelectChange={this.handleSelectChange}
            {...this.state}
          />
          <TickSubmitButton />
        </form>
      </section>
    );
  }
}

export default StylesForm;
