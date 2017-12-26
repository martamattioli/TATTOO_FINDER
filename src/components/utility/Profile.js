import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Grid, Row, Col } from 'react-bootstrap';

import ProfilePic from '../artistprofile/ProfilePic';
import Icon from '../elements/icons/Icon';
import Card from '../elements/divs/Card';
import ColoredSection from '../elements/divs/ColoredSection';
import RoundedDiv from '../elements/divs/RoundedDiv';
import ActualButton from '../elements/buttons/ActualButton';
import Button from '../elements/buttons/Button';
import InstaOauthButton from '../auth/InstaOauthButton';
import StylesForm from '../styles/StylesForm';
import StudioCard from '../studios/StudioCard';

const Profile = ({ user, showUserForm, showStylesForm, showForm, fetchArtist, removeLocation, isInstaConnected, isArtist, disconnectInsta, isEditable }) => {
  return(
    <div>
      <div style={{textAlign: 'center', margin: '40px 0 50px 0'}}>
        <ProfilePic
          picture={user.image}
          isClaimed={user.isClaimed}
          size="large"
          isEditable={isEditable}
        />
        {user.image && isEditable && <Icon
          className="fa fa-pencil-alt"
          aria-hidden="true"
          fontSize="20px"
          hover={true}
        />}
        <h1
          style={{marginTop: '20px'}}
        >{user.username} { isEditable && <ActualButton
            padding="0"
            onClick={() => showForm('showUserForm', 'username')}
          ><Icon
              className="fa fa-pencil-alt"
              aria-hidden="true"
              fontSize="20px"
              hover={true}
            />
          </ActualButton>}
          <RoundedDiv
            display="inline-block"
            fontSize="18px"
            margin="0 0 0 20px"
          ><Icon
              className="fas fa-star"
              fontSize="15px"
              addMarginRight="5px"
            />{ user.averageRatings === 0 && <span>n/a</span> ||
              <span>{ user.averageRatings }</span>}
          </RoundedDiv>
        </h1>
        <h3 style={{padding: '20px'}}>
          <span>
            <Icon
              className="far fa-envelope"
              aria-hidden="far fa-envelope"
            /> {isEditable && [
              <span key={0}>{ user.email }</span>,
              <ActualButton
                key={1}
                margin="0"
                padding="0 5px"
                onClick={() => showForm('showUserForm', 'email')}
              ><Icon
                  className="fa fa-pencil-alt"
                  aria-hidden="true"
                  fontSize="10px"
                  hover={true}
                />
              </ActualButton>
            ]} { !isEditable && <a
              href={'mailto:' + user.email}>
                Contact him
            </a>}
          </span>
          {' '}
          { (user.website || isEditable) && <span>
            <Icon
              className="fas fa-external-link-alt"
              fontSize="84%"
              addMarginLeft="20px"
            /> { !showUserForm && isEditable && <span>
              { user.website  &&
                <span>{ user.website } { isEditable && <ActualButton
                  margin="0"
                  padding="0 5px"
                  onClick={() => showForm('showUserForm', 'website')}
                ><Icon
                    className="fa fa-pencil-alt"
                    aria-hidden="true"
                    fontSize="10px"
                    hover={true}
                  />
                </ActualButton>}</span>}
              { !user.website && isEditable && <span>Add your website <ActualButton
                margin="0"
                padding="0 5px"
                onClick={() => showForm('showUserForm', 'website')}
              ><Icon
                  className="fas fa-plus"
                  aria-hidden="true"
                  fontSize="10px"
                  hover={true}
                />
              </ActualButton>
              </span>}
            </span>}
            { !isEditable && <a href={`http://${user.website}`} target="_blank">
              { user.website }
            </a>}
          </span>}
        </h3>
        { !showStylesForm && <div>
          { user.styles.length === 0 && <h3>
          Add styles <ActualButton
              onClick={() => showForm('showStylesForm')}
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
              {user.styles.map(style => <Button
                key={style.id}
                to={`/styles/${style.id}`}
                background="black"
                color="white"
                margin="0 5px"
              >
                {style.name}
              </Button>)} { isEditable && <ActualButton
                onClick={() => showForm('showStylesForm')}
                radius="50%"
                padding="5px 6px 1px 6px"
              ><Icon
                  className="fa fa-pencil-alt"
                  aria-hidden="true"
                  fontSize="10px"
                  hover={true}
                /></ActualButton>}
            </div>}
        </div>}
        { showStylesForm && <StylesForm
          artist={user}
          fetchArtist={fetchArtist}
          showForm={showForm}
        />}
      </div>
      <ColoredSection
        background="darkGrey"
        padding="20px 0"
      >
        <Grid>
          <h2 style={{marginBottom: '20px'}}>Working at:</h2>
          <Row>
            { user.locations.map(location => <Col md={4} key={location.id}>
              <StudioCard
                studio={location.studioEvent}
                location={location}
                removeLocation={removeLocation}
                isEditable={isEditable}
              />
            </Col>
            )}
            { isEditable && <Col md={4}>
              <Card
                border="solid 4px black"
                radius="4px"
                hoverColor="darkerGrey"
                hover={true}
                align="center"
                onClick={() => showForm('showStudioForm')}
              ><Icon
                  className="fas fa-plus"
                  fontSize="30px"
                  centerPosition={true}
                /></Card>
            </Col>}
          </Row>
        </Grid>
      </ColoredSection>
      {/* { user.instaInfo && <Insta
        artist={user}
      />} */}
      { isArtist && isEditable && [
        <ColoredSection
          key={0}
          background="lightGrey"
        >
          { isInstaConnected && <Grid fluid>
            <Row>
              <Col sm={6}>
                <h2>INSTAGRAM FEED</h2>
              </Col>
              <Col sm={6} style={{textAlign: 'right'}}>
                <ActualButton
                  onClick={ disconnectInsta }
                  background="white"
                  hover={true}
                >Disconnect from Instagram</ActualButton>
              </Col>
            </Row>
          </Grid> || <InstaOauthButton provider="instagram">Connect to Instagram</InstaOauthButton>}
        </ColoredSection>
      ]}
    </div>
  );
};

export default Profile;
