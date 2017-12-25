import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import moment from 'moment';

import Card from '../elements/divs/Card';
import ActualButton from '../elements/buttons/ActualButton';

import ProfilePic from '../artistprofile/ProfilePic';

const ArtistCard = ({ artist, thisResourceId, inStudios, size, history, fetchStyle }) => {
  const location = artist.locations.find(location => `${location.studioEvent}` === thisResourceId);
  const moveToTop = '70px';
  return(
    <Card
      border="solid 4px black"
      radius="4px"
      hoverColor="lightGrey"
      align="center"
      padding="20px"
      style={{position: 'relative'}}
      moveToTop={moveToTop}
      // onClick={() => this.props.history.push(`/studios/${location.studioEvent.id}`)}
    >
      <Link to={`/artists/${artist.id}`}>
        <div
          style={{margin: '0 0 20px 0'}}
        >
          <ProfilePic
            picture={artist.image}
            isClaimed={artist.isClaimed}
            size={size}
            moveToTop={`-${moveToTop}`}
          />
          <h3>{artist.username}</h3>
        </div>
      </Link>
      { artist.styles.length > 0 && <div>
        {artist.styles.map((style, index) => {
          return(
            <ActualButton
              key={style.id}
              onClick={() => {
                (fetchStyle) ? fetchStyle(style.id): history.push(`/styles/${style.id}`);
              }}
              background="black"
              color="white"
              fontSize="10px"
              padding="2px 4px"
              margin={(index !== (artist.styles.length - 1)) ? '0 5px 5px 0' : '0px'}
              disabled={`${style.id}` === `${thisResourceId}`}
            >
              {style.name}
            </ActualButton>
          );
        })}
      </div>}
      { inStudios && <div style={{marginTop: '10px'}}>
        {location && location.resident && <p>Resident</p>}
        {location && location.startDate && <p>Here from {moment(location.startDate).format('DD-MM-YYYY')} to {moment(location.endDate).format('DD-MM-YYYY')}</p>}
      </div>}
    </Card>
  );
};

export default withRouter(ArtistCard);
