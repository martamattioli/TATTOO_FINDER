import React from 'react';

const CardItem = ({ studio }) => {
  return(
    <li>
      <h3>
        {studio.name}
        <span
          className="flag-img"
          style={{ backgroundImage: 'url(' + studio.country.flag + ')' }}
        ></span>
      </h3>
    </li>
  );
};

export default CardItem;
