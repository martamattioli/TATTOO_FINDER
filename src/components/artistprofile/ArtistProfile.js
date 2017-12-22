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
import Message from '../elements/messages/Message';
import ActualButton from '../elements/buttons/ActualButton';

import InstaOauthButton from '../auth/InstaOauthButton';

class ArtistProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: Auth.getPayload().userId,
      user: null,
      isArtist: false,
      isInstaConnected: false
    };
    this.disconnectInsta = this.disconnectInsta.bind(this);
    this.closeMsg = this.closeMsg.bind(this);
  }

  componentDidMount() {
    Axios
      .get(`/api/users/${this.state.userId}`)
      .then(res => {
        this.doChecks(res);
      })
      .catch(err => console.log(err));
  }

  doChecks(res) {
    const isArtist = (res.data.role === 'artist') ? true : false;
    const isInstaConnected = res.data.instaAccessToken ? true : false;
    this.setState({ user: res.data, isArtist, isInstaConnected }, () => {
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

  render() {
    if (!this.state.user) return null;
    if (this.state.message) this.closeMsg();
    return (
      <section>
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
            isClaimed={true}
          />
          {this.state.user.image && <Icon
            className="fa fa-pencil-alt"
            aria-hidden="true"
            fontSize="20px"
            hover={true}
          />}
          <h1>{ this.state.user.username } <Icon
            className="fa fa-pencil-alt"
            aria-hidden="true"
            fontSize="20px"
            hover={true}
          />
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
              /> { this.state.user.email } <Icon
                className="fa fa-pencil-alt"
                aria-hidden="true"
                fontSize="10px"
                hover={true}
              /></span>
            {' '}
            <span>
              <Icon
                className="fas fa-external-link-alt"
                fontSize="84%"
                addMarginLeft="20px"
              /> { this.state.user.website &&
                <span>{ this.state.user.website } <Icon
                  className="fa fa-pencil-alt"
                  aria-hidden="true"
                  fontSize="10px"
                  hover={true}
                /></span> ||
                <span>Add your website <Icon
                  className="fas fa-plus"
                  aria-hidden="true"
                  fontSize="10px"
                  hover={true}
                /></span>}
            </span>
          </h3>
          { this.state.user.styles.length === 0 && <h3>
            Add styles <Icon
              className="fas fa-plus"
              fontSize="10px"
              hover={true}
            />
          </h3> || <div>{this.state.user.styles.map(style => <span key={style.id}>
              {style.name}
            </span>)}</div>}
        </div>
        <ColoredSection
          background="darkGrey"
        >
          <Grid fluid>
            <h2 style={{marginBottom: '20px'}}>Working at:</h2>
            <Row>
              { this.state.user.locations.length > 0 && <Col md={4}>
                { this.state.user.locations.map(location => <div key={location.id}>
                  <p>{location.id}</p>
                </div>)}
              </Col>}
              <Col md={4}>
                { (this.state.user.locations.length === 0) && <Card
                  border="solid 4px black"
                  radius="4px"
                  hoverColor="darkerGrey"
                  align="center"
                ><Icon
                    className="fas fa-plus"
                    fontSize="30px"
                    centerPosition={true}
                  /></Card>}
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
                <Col md={6}>
                  <h2>INSTAGRAM FEED</h2>
                </Col>
                <Col md={6} style={{textAlign: 'right'}}>
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
