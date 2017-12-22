import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../statics/Home';

import Register from '../auth/Register';
import RegisterArtist from '../auth/RegisterArtist';
import Login from '../auth/Login';

import ArtistShow from '../artists/ArtistShow';
import ArtistsIndex from '../artists/ArtistsIndex';

import ArtistProfile from '../artistprofile/ArtistProfile';

import StyleNew from '../styles/StyleNew';

const Routes = () => {
  return(
    <Switch>
      <Route path="/register" component={Register} />
      <Route exact path="/artist-register" component={RegisterArtist} />
      <Route path="/login" component={Login} />
      <Route exact path="/artists/:id" component={ArtistShow} />
      <Route path="/artists" component={ArtistsIndex} />
      <Route path="/my-profile" component={ArtistProfile} />
      <Route path="/styles/new" component={StyleNew} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default Routes;
