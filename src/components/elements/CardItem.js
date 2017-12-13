import React from 'react';

const CardItem = ({ studio }) => {
  let avgRatings = null;
  if (studio.averageRatings === 0) {
    avgRatings = 'Still no ratings!*'; // add infowindow on hover that says that each studio is an average of averages
  } else {
    avgRatings = `${studio.averageRatings} average rating, ${studio.countRatings} ratings*`;
  }

  return(
    <li>
      <h3>{studio.name}</h3>
      <div>
        <i className="fas fa-map-marker-alt"></i>
        {/* ADD INFOWINDOW ON FLAG HOVER THAT SAYS THE NAME OF THE COUNTRY */}
        {/* ADD LINK TO STUDIOS/ARTISTS WITH THAT COUNTRY */}
        {/* AFTER THAT LIST, ADD THE OTHER COUNTRIES YOU MAY WANT TO SEE */}
        <span
          className="flag-img"
          style={{ backgroundImage: 'url(' + studio.country.flag + ')' }}
        ></span>
      </div>
      <p>
        <i className="fas fa-user-circle"></i>
        {studio.artists.length} artists work here
      </p>
      <p>
        <i className="fas fa-star"></i>
        {avgRatings}
      </p>
    </li>
  );
};

export default CardItem;
