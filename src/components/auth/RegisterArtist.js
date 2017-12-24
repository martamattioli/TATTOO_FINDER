import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';

import UserRegisterForm from './UserRegisterForm';

import Message from '../elements/messages/Message';
import ActualButton from '../elements/buttons/ActualButton';

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
      errors: null,
      showRequestForm: false,
      showCompleteForm: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
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

  toggleForm(field) {
    this.setState({[field]: !this.state[field]});
  }

  render() {
    return(
      <section>
        <h1>Register as a Tattoo Artist</h1>
        { !this.state.showRequestForm && <p>Contact us, entering all the required fields</p>}
        { !this.state.showCompleteForm && <div>
          <ActualButton
            onClick={() => this.toggleForm('showCompleteForm')}
            background="lightGrey"
          >Have a registration code? Complete your registration here</ActualButton>
        </div>}
        { this.state.showCompleteForm && <div>
          <h2>Complete your registration</h2>
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
            passwordPlaceholder="Choose a new password"
          />
          <ActualButton
            onClick={this.toggleForm}
            background="lightGrey"
          >Annulla</ActualButton>
        </div>}
      </section>
    );
  }
}

export default RegisterArtist;
