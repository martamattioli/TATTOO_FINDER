import React from 'react';
import Axios from 'axios';

import { Grid } from 'react-bootstrap';

import Auth from '../../lib/Auth';

import PercentageComplete from './PercentComplete';

import ModalBackground from '../elements/divs/ModalBackground';
import Message from '../elements/messages/Message';

import UserForm from './UserForm';
import AddStudio from '../studios/AddStudio';

import Profile from '../utility/Profile';

class ArtistProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: Auth.getPayload().userId,
      user: null,
      isArtist: false,
      isInstaConnected: false,
      field: null,
      showStylesForm: false,
      showUserForm: false,
      showStudioForm: false
    };
    this.fetchArtist = this.fetchArtist.bind(this);
    this.disconnectInsta = this.disconnectInsta.bind(this);
    this.closeMsg = this.closeMsg.bind(this);
    this.showForm = this.showForm.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
  }

  componentDidMount() {
    this.fetchArtist(false);
  }

  fetchArtist(showHide) {
    Axios
      .get(`/api/users/${this.state.userId}`)
      .then(res => {
        this.doChecks(res, showHide);
      })
      .catch(err => console.log(err));
  }

  doChecks(res, showHide) {
    const isArtist = (res.data.role === 'artist') ? true : false;
    const isInstaConnected = res.data.instaAccessToken ? true : false;
    this.setState({
      user: res.data,
      isArtist,
      isInstaConnected,
      showStylesForm: showHide,
      showUserForm: showHide,
      showStudioForm: showHide
    }, () => {
      // if (this.state.isInstaConnected) {
      //   Axios.all([
      //     Axios.get(`https://api.instagram.com/v1/users/self/?access_token=${Auth.getPayload().access_token}`),
      //     Axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${Auth.getPayload().access_token}`)
      //   ])
      //     .then(Axios.spread((artistInfo, artistPhotos) => {
      //       console.log(artistInfo, artistPhotos);
      //       const instaInfo = { followers: artistInfo.data.data.counts.followed_by, media: artistInfo.data.data.counts.media };
      //       const user = Object.assign({}, this.state.user, {
      //         instaStream: artistPhotos.data.data,
      //         instaInfo
      //       });
      //
      //       this.setState({ user }, () => console.log('IN PROFILE OPTIONS', this.state));
      //     }));
      // }
    });
  }

  disconnectInsta() {
    Axios
      .put(`/api/artists/${this.state.userId}/disconnectinsta`, {}, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => {
        Auth.setToken(res.data.token);
        this.setState({
          user: res.data.artist,
          message: res.data.message,
          isArtist: true,
          isInstaConnected: false
        });
      })
      .catch(err => console.log('err', err));
  }

  closeMsg() {
    setTimeout(() => {
      this.setState({ message: null });
    }, 2000);
  }

  showForm(form, fieldToShow) {
    const showHide = !this.state[form];
    this.setState({[form]: showHide, field: fieldToShow});
  }

  removeLocation(locationId) {
    Axios
      .delete(`/api/artists/${Auth.getPayload().userId}/locations/${locationId}`, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => {
        this.fetchArtist();
      })
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.user) return null;
    if (this.state.message) this.closeMsg();
    return (
      <section>
        { (this.state.showUserForm || this.state.showStudioForm) && <ModalBackground>
          { this.state.showUserForm && <UserForm
            user={this.state.user}
            field={this.state.field}
            fetchArtist={this.fetchArtist}
            showForm={this.showForm}
          />}
          { this.state.showStudioForm && <AddStudio
            showForm={this.showForm}
            userId={this.state.user.id}
            fetchArtist={this.fetchArtist}
            locations={this.state.user.locations}
          />}
        </ModalBackground>}

        {this.state.message && <Message
          background="green"
          border="solid 2px black"
          color="white"
          radius="4px"
        >
          { this.state.message }
        </Message>}
        <Grid fluid>
          <PercentageComplete
            percent={this.state.user.percentageComplete}
            artistId={this.state.user.id}
          />
        </Grid>
        <Profile
          user={this.state.user}
          showUserForm={this.state.showUserForm}
          showStylesForm={this.state.showStylesForm}
          showForm={this.showForm}
          fetchArtist={this.fetchArtist}
          removeLocation={this.removeLocation}
          isArtist={this.state.isArtist}
          isInstaConnected={this.state.isInstaConnected}
          disconnectInsta={this.disconnectInsta}
          isEditable={true}
        />
      </section>
    );
  }
}

export default ArtistProfile;
