import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

import OAuthButton from './OAuthButton';
import UserRegisterForm from './UserRegisterForm';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        base64: '',
        role: 'user'
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value }}) {
    console.log('handling change');
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user }, () => console.log(this.state));
  }

  changeRole(role) {
    const user = Object.assign({}, this.state.user, { role });
    this.setState({ user }, () => console.log('this state user', this.state.user));
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.user);
    Axios
      .post('/api/register', this.state.user)
      .then(res => {
        Auth.setToken(res.data.token);
        if (res.data.user.role === 'artist') {
          this.props.history.push('/my-profile');
        } else {
          this.props.history.push({
            pathname: '/',
            state: {
              message: res.data.message,
              type: 'success'
            }
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <section>
        <h1>Join us!</h1>
        <UserRegisterForm
          user={this.state.user}
          cta="Register"
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <div>
          <a href="#" onClick={() => this.changeRole('artist')}>I am an artist...</a>
          {' '}
          <a href="#" onClick={() => this.changeRole('user')}>I am a user...</a>
        </div>
        <OAuthButton provider="facebook">Register with Facebook</OAuthButton>
        <p>Already have an account?
          <Link to="/login">Login instead</Link>
        </p>
        <p>Are you an artist?
          <Link to="/artist-register">Contact us to get an account...</Link>
        </p>
      </section>
    );
  }
}

export default Register;
