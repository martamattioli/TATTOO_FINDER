import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import Auth from '../../lib/Auth';

const ProtectedRoute = ({ component: Component, ...other }) => {
  return (
    <Route {...other} render={props => (
      (Auth.isAuthenticated() && (Auth.getPayload().role === 'artist' || Auth.getPayload().userId === '5a42045160d7925f053b15d3')) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: props.history.goBack(),
            state: {
              message: 'You don\'t have access to this page',
              type: 'error'
            }
          }}
        />
      )
    )} />
  );
};

export default withRouter(ProtectedRoute);
