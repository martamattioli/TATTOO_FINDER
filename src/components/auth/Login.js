import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Auth from '../../lib/Auth';

import UserLoginForm from './UserLoginForm';

import OAuthButton from './OAuthButton';
import ErrorMessage from '../elements/messages/ErrorMessage';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {
        name: '',
        password: ''
      },
      errors: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeError = this.removeError.bind(this);
  }

  handleChange({ target: { name, value }}) {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit(e) {
    e.preventDefault();

    Axios
      .post('/api/login', this.state.user)
      .then(res => {
        Auth.setToken(res.data.token);
        if (res.data.user.role === 'artist') {
          this.props.history.push('/options');
        } else {
          this.props.history.push({
            pathname: '/',
            state: { message: res.data.message }
          });
        }
      })
      .catch(err => {
        this.setState({ errors: err.response.data});
      });
  }

  removeError() {
    setTimeout(() => {
      this.setState({ errors: null, user: { name: '', password: '' } });
    }, 2000);
  }

  render() {
    return (
      <section>
        <h1>LOGIN</h1>
        { this.state.errors && <ErrorMessage>{ this.state.errors.message }</ErrorMessage>}
        <UserLoginForm
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <p>{'Don\'t'} have an account?
          <Link to="/register">Register instead</Link>
        </p>
        <OAuthButton provider="facebook">Login with Facebook</OAuthButton>
      </section>
    );
  }
}

export default Login;
