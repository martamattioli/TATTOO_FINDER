import React from 'react';

const Insta = ({ artist }) => {
  return (
    <div>
      {artist.instaInfo && [
        <h2 key={0}>Instagram Feed
          <span>{artist.instaInfo.followers} followers</span>,
          <span>{artist.instaInfo.media} photos</span>
        </h2>
      ]}
      { artist.instaStream && artist.instaStream.map(photo => {
        const dateCreated = Date(photo.created_time);
        return (
          <div key={photo.id}>
            <img className="insta-stream" src={photo.images.standard_resolution.url} />
            <p>{photo.likes.count} likes</p>
            <p>{dateCreated}</p>
          </div>
        );
      })}
      <a target="_blank" href={`https://www.instagram.com/${artist.instaUsername}/`}>View more on Instagram...</a>
    </div>
  );
};

export default Insta;
