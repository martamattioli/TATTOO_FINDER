import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import { Grid, Row, Col } from 'react-bootstrap';

import Auth from '../../lib/Auth';

import PercentageComplete from './PercentComplete';
import ProfilePic from './ProfilePic';

import Icon from '../elements/icons/Icon';
import Card from '../elements/divs/Card';
import ColoredSection from '../elements/divs/ColoredSection';
import RoundedDiv from '../elements/divs/RoundedDiv';
import ModalBackground from '../elements/divs/ModalBackground';
import AbsolutelyPosition from '../elements/divs/AbsolutelyPosition';
import Message from '../elements/messages/Message';
import ActualButton from '../elements/buttons/ActualButton';
import Button from '../elements/buttons/Button';

import InstaOauthButton from '../auth/InstaOauthButton';

import UserForm from './UserForm';
import StylesForm from '../styles/StylesForm';
import AddStudio from '../studios/AddStudio';

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
      console.log(this.state);
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
        <div style={{textAlign: 'center', margin: '40px 0 50px 0'}}>
          <ProfilePic
            picture={this.state.user.image}
            isClaimed={this.state.user.isClaimed}
            size="large"
          />
          {this.state.user.image && <Icon
            className="fa fa-pencil-alt"
            aria-hidden="true"
            fontSize="20px"
            hover={true}
          />}
          <h1>{ this.state.user.username } <ActualButton
            onClick={() => this.showForm('showUserForm', 'username')}
          ><Icon
              className="fa fa-pencil-alt"
              aria-hidden="true"
              fontSize="20px"
              hover={true}
            />
          </ActualButton>
          <RoundedDiv
            display="inline-block"
            fontSize="18px"
            margin="0 0 0 20px"
          ><Icon
              className="fas fa-star"
              fontSize="15px"
              addMarginRight="5px"
            />{ this.state.user.averageRatings === 0 && <span>n/a</span> ||
              <span>{ this.state.user.averageRatings }</span>}
          </RoundedDiv>
          </h1>
          <h3>
            <span>
              <Icon
                className="far fa-envelope"
                aria-hidden="far fa-envelope"
              /> { this.state.user.email } <ActualButton
                onClick={() => this.showForm('showUserForm', 'email')}
              ><Icon
                  className="fa fa-pencil-alt"
                  aria-hidden="true"
                  fontSize="10px"
                  hover={true}
                />
              </ActualButton></span>
            {' '}
            <span>
              <Icon
                className="fas fa-external-link-alt"
                fontSize="84%"
                addMarginLeft="20px"
              /> { !this.state.showUserForm && <span>
                { this.state.user.website &&
                  <span>{ this.state.user.website } <ActualButton
                    onClick={() => this.showForm('showUserForm', 'website')}
                  ><Icon
                      className="fa fa-pencil-alt"
                      aria-hidden="true"
                      fontSize="10px"
                      hover={true}
                    />
                  </ActualButton></span> ||
                  <span>Add your website <ActualButton
                    onClick={() => this.showForm('showUserForm', 'website')}
                  ><Icon
                      className="fas fa-plus"
                      aria-hidden="true"
                      fontSize="10px"
                      hover={true}
                    />
                  </ActualButton>
                  </span>}
              </span>}
            </span>
          </h3>
          { !this.state.showStylesForm && <div>
            { this.state.user.styles.length === 0 && <h3>
            Add styles <ActualButton
                onClick={() => this.showForm('showStylesForm')}
                radius="50%"
                padding="0px 11px 7px 11px"
              ><Icon
                  className="fas fa-plus"
                  aria-hidden="true"
                  fontSize="10px"
                  hover={true}
                />
              </ActualButton>
            </h3> || <div>
                {this.state.user.styles.map(style => <Button
                  key={style.id}
                  to={`/styles/${style.id}`}
                  background="black"
                  color="white"
                  margin="0 5px"
                >
                  {style.name}
                </Button>)} <ActualButton
                  onClick={() => this.showForm('showStylesForm')}
                  radius="50%"
                  padding="5px 6px 1px 6px"
                ><Icon
                    className="fa fa-pencil-alt"
                    aria-hidden="true"
                    fontSize="10px"
                    hover={true}
                  /></ActualButton>
              </div>}
          </div>}
          { this.state.showStylesForm && <StylesForm
            artist={this.state.user}
            fetchArtist={this.fetchArtist}
            showForm={this.showForm}
          />}
        </div>
        <ColoredSection
          background="darkGrey"
        >
          <Grid fluid>
            <h2 style={{marginBottom: '20px'}}>Working at:</h2>
            <Row>
              { this.state.user.locations.map(location => <Col md={4} key={location.id}>
                <Card
                  border="solid 4px black"
                  radius="4px"
                  hoverColor="darkerGrey"
                  align="center"
                  style={{position: 'relative'}}
                  background={`url(${location.studioEvent.image})`}
                  // onClick={() => this.props.history.push(`/studios/${location.studioEvent.id}`)}
                >
                  <Link to={`/studios/${location.studioEvent.id}`}>
                    <AbsolutelyPosition
                      textAlign="left"
                      bottom="10px"
                      left="10px"
                    >
                      <p>{location.studioEvent.name}</p>
                      { location.resident && <p>Resident</p>}
                    </AbsolutelyPosition>
                  </Link>
                  <AbsolutelyPosition
                    bottom="10px"
                    right="10px"
                    onClick={() => this.removeLocation(location.id)}
                  ><ActualButton>
                      <Icon
                        className="fa fa-trash"
                        aria-hidden="true"
                        hover={true}
                      />
                    </ActualButton>
                  </AbsolutelyPosition>
                </Card>
              </Col>
              )}
              <Col md={4}>
                <Card
                  border="solid 4px black"
                  radius="4px"
                  hoverColor="darkerGrey"
                  hover={true}
                  align="center"
                  onClick={() => this.showForm('showStudioForm')}
                ><Icon
                    className="fas fa-plus"
                    fontSize="30px"
                    centerPosition={true}
                  /></Card>
              </Col>
            </Row>
          </Grid>
        </ColoredSection>
        {/* { this.state.user.instaInfo && <Insta
          artist={this.state.user}
        />} */}
        { this.state.isArtist && [
          <ColoredSection
            key={0}
            background="lightGrey"
          >
            { this.state.isInstaConnected && <Grid fluid>
              <Row>
                <Col sm={6}>
                  <h2>INSTAGRAM FEED</h2>
                </Col>
                <Col sm={6} style={{textAlign: 'right'}}>
                  <ActualButton
                    onClick={ this.disconnectInsta }
                    background="white"
                  >Disconnect from Instagram</ActualButton>
                </Col>
              </Row>
            </Grid> || <InstaOauthButton provider="instagram">Connect to Instagram</InstaOauthButton>}
          </ColoredSection>
        ]}
      </section>
    );
  }
}

export default ArtistProfile;
