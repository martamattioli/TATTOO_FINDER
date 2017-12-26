import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProtectedArtistRoute from './ProtectedArtistRoute';

import Home from '../statics/Home';

import Register from '../auth/Register';
import RegisterArtist from '../auth/RegisterArtist';
import Login from '../auth/Login';

import ArtistShow from '../artists/ArtistShow';
import ArtistsIndex from '../artists/ArtistsIndex';

import ArtistProfile from '../artistprofile/ArtistProfile';

import StyleShow from '../styles/StyleShow';
import StylesIndex from '../styles/StylesIndex';

import StudiosIndex from '../studios/StudiosIndex';
import StudioShow from '../studios/StudioShow';

const Routes = () => {
  return(
    <Switch>
      <Route path="/register" component={Register} />
      <Route exact path="/artist-register" component={RegisterArtist} />
      <Route path="/login" component={Login} />
      <Route exact path="/artists/:id" component={ArtistShow} />
      <Route path="/artists" component={ArtistsIndex} />
      <ProtectedArtistRoute path="/my-profile" component={ArtistProfile} />
      <Route exact path="/styles" component={StylesIndex} />
      <Route exact path="/styles/:id" component={StyleShow} />
      <Route path="/studios/:id" component={StudioShow} />
      <Route path="/studios" component={StudiosIndex} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default Routes;
