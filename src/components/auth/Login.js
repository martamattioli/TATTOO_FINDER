import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {
        username: '',
        // email: '',
        password: ''
      }
    };
  }

  render() {
    return (
      <section>
        <h1>LOGIN</h1>
        <p>{'Don\'t'} have an account?
          <Link to="/register">Register instead</Link>
        </p>
      </section>
    );
  }
}

export default Login;
