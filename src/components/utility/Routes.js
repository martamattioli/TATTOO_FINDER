import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../statics/Home';

import Register from '../auth/Register';
import Login from '../auth/Login';

const Routes = () => {
  return(
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default Routes;
