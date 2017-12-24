import React from 'react';

import Circle from '../elements/divs/Circle';
import Icon from '../elements/icons/Icon';

const ProfilePic = ({ picture, isClaimed, size }) => {
  console.log('SIZE', size);
  let fontSize;
  if (size === 'small') {
    fontSize = '25px';
  } else if (size === 'medium') {
    console.log('IF MEDIUM');
    fontSize = '40px';
  } else {
    console.log('IF LARGE');
    fontSize = '50px';
  }
  return (
    <Circle
      profilePic={picture}
      size={size}
    >
      { isClaimed && <Icon
        className="fas fa-check-circle"
        aria-hidden="true"
        fontSize={fontSize}
        color="lightBlue"
        position="absolute"
        right="5px"
      />}
      {!picture || size === 'large' && <Icon
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
