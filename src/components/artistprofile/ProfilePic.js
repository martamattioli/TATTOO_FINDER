import React from 'react';

import Circle from '../elements/divs/Circle';
import UploadIcon from '../elements/icons/UploadIcon';

const ProfilePic = ({ picture }) => {
  const size = 170;

  return (
    <Circle
      profilePic={picture}
      width={`${size}px`}
      height={`${size}px`}
    >
      {!picture && <UploadIcon
        className="fa fa-upload"
        aria-hidden="true"
        fontSize="50px"
      ></UploadIcon>}
    </Circle>
  );
};

export default ProfilePic;
