import React from 'react';

import Circle from '../elements/divs/Circle';
import Icon from '../elements/icons/Icon';

const ProfilePic = ({ picture, isClaimed, size, moveToTop }) => {
  let fontSize;
  let right;
  if (size === 'small') {
    fontSize = '20px';
    right = '5px';
  } else if (size === 'medium') {
    fontSize = '40px';
    right = 0;
  } else {
    fontSize = '50px';
    right = 0;
  }
  return (
    <Circle
      profilePic={picture}
      size={size}
      moveToTop={moveToTop}
    >
      { isClaimed && <Icon
        className="fas fa-check-circle"
        aria-hidden="true"
        fontSize={fontSize}
        color="lightBlue"
        position="absolute"
        right={right}
      />}
      {!picture && size === 'large' && <Icon
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
