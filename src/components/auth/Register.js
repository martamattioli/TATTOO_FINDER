import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

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
        role: 'user'
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value }}) {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  changeRole(role) {
    const user = Object.assign({}, this.state.user, { role });
    this.setState({ user }, () => console.log(this.state.user));
  }

  handleSubmit(e) {
    e.preventDefault();

    Axios
      .post('/api/register', this.state.user)
      .then(res => {
        Auth.setToken(res.data.token);
        this.props.history.push({
          pathname: '/',
          state: { message: res.data.message }
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <section>
        <h1>Join us!</h1>
        <UserRegisterForm
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <a href="#" onClick={() => this.changeRole('artist')}>I am an artist...</a>
        <a href="#" onClick={() => this.changeRole('user')}>I am a user...</a>
        <p>Already have an account?
          <Link to="/login">Login instead</Link>
        </p>
        <p>Are you an artist?
          <a>Contact us to get an account...</a>
        </p>
      </section>
    );
  }
}

export default Register;
