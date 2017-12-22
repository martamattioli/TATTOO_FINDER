import React from 'react';

import Circle from '../elements/divs/Circle';
import Icon from '../elements/icons/Icon';

const ProfilePic = ({ picture, isClaimed }) => {
  const size = 170;

  return (
    <Circle
      profilePic={picture}
      width={`${size}px`}
      height={`${size}px`}
    >
      { isClaimed && <Icon
        className="fas fa-check-circle"
        aria-hidden="true"
        fontSize="50px"
        color="lightBlue"
        position="absolute"
        right="0"
      />}
      {!picture && <Icon
        className="fa fa-upload"
        aria-hidden="true"
        fontSize="50px"
        color="white"
        centerPosition={true}
      ></Icon>}
    </Circle>
  );
};

export default ProfilePic;
