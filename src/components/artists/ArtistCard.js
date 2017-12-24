import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../elements/divs/Card';
import Circle from '../elements/divs/Circle';
import ActualButton from '../elements/buttons/ActualButton';

const ArtistCard = ({ artist, thisStyleId, size }) => {
  return(
    <Card
      border="solid 4px black"
      radius="4px"
      hoverColor="darkerGrey"
      align="center"
      padding="20px"
      style={{position: 'relative'}}
      // onClick={() => this.props.history.push(`/studios/${location.studioEvent.id}`)}
    >
      <Link to={`/artists/${artist.id}`}>
        <div
          style={{margin: '0 0 20px 0'}}
        >
          <Circle
            profilePic={artist.instaProfilePic}
            width={`${size}px`}
            height={`${size}px`}
          />
          <h3>{artist.username}</h3>
        </div>
      </Link>
      <div>
        <h3 style={{fontSize: '18px', marginBottom: '10px'}}>Other styles:</h3>
        {artist.styles.map((style, index) => {
          console.log(`${style.id}`, `${thisStyleId}`, `${style.id}` === `${thisStyleId}`);
          return(
            <ActualButton
              key={style.id}
              onClick={() => this.fetchStyle(style.id)}
              background="black"
              color="white"
              fontSize="11px"
              margin={(index !== (artist.styles.length - 1)) ? '0 5px 5px 0' : '0px'}
              disabled={`${style.id}` === `${thisStyleId}`}
            >
              {style.name}
            </ActualButton>
          );
        })}
      </div>
    </Card>
  );
};

export default ArtistCard;
