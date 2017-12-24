import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';

import UserRegisterForm from './UserRegisterForm';

import Message from '../elements/messages/Message';

class RegisterArtist extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        registrationCode: '',
        role: 'artist'
      },
      errors: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({target: {name, value}}) {
    const artist = Object.assign({}, this.state.artist, { [name]: value });
    this.setState({artist});
  }

  handleSubmit(e) {
    e.preventDefault();

    Axios
      .post('/api/loginartist', this.state.artist)
      .then(res => {
        Auth.setToken(res.data.token);
        this.props.history.push('/my-profile');
      })
      .catch(err => {
        this.setState({ errors: err.response.data});
      });
  }

  render() {
    return(
      <section>
        <h1>Register as a Tattoo Artist</h1>
        <p>Send us a message on our instagram account, we will be in touch to confirm your identity and grant you access.</p>
        { this.state.errors && <Message
          background="red"
          color="white"
        >{ this.state.errors.message }</Message>}
        <UserRegisterForm
          user={this.state.artist}
          cta="Log in!"
          registrationCode={true}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </section>
    );
  }
}

export default RegisterArtist;
