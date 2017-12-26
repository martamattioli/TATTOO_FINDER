import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import moment from 'moment';

import Card from '../elements/divs/Card';
import ColoredSection from '../elements/divs/ColoredSection';
import AbsolutelyPosition from '../elements/divs/AbsolutelyPosition';
import ActualButton from '../elements/buttons/ActualButton';
import Button from '../elements/buttons/Button';
import Icon from '../elements/icons/Icon';

const Insta = ({ artist, instaInfo, instaStream, photosToShow, showMore, showLess }) => {
  const subInstaStream = instaStream.slice(0, photosToShow);
  console.log(photosToShow);
  return (
    <ColoredSection
      background="lightGrey"
      padding="20px 0"
    >
      <Grid>
        {instaInfo && [
          <h2 key={0} style={{margin: '20px 0'}}>Instagram Feed: <span>
            {instaInfo.followers} followers</span>, <span>
            {instaInfo.media} photos</span>
          </h2>
        ]}
        <Row>
          { instaStream && subInstaStream.map(photo => {
            const time = photo.created_time;
            return (
              <Col sm={4} key={photo.id}>
                <Card
                  border="solid 4px black"
                  radius="4px"
                  hoverColor="darkerGrey"
                  align="center"
                  style={{position: 'relative'}}
                  background={`url(${photo.images.standard_resolution.url})`}
                  minHeight="300px"
                >
                  <AbsolutelyPosition
                    bottom="10px"
                    right="10px"
                    textAlign="right"
                    background="white"
                    padding="5px"
                    radius="4px"
                  >
                    <p><Icon
                      className="fa fa-heart"
                    />{photo.likes.count}</p>
                    <p>{moment(moment(new Date(parseInt(time) * 1000)).format('YYYYMMDD'), 'YYYYMMDD').fromNow()}</p>
                  </AbsolutelyPosition>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Row style={{textAlign: 'center'}}>
          <Col sm={6}>
            { photosToShow < 20 && <ActualButton
              onClick={showMore}
              margin="0 20px"
              padding="10px 20px"
              background="lightGrey"
              hover={true}
            >SHOW MORE</ActualButton>}
            { photosToShow > 6 && <ActualButton
              onClick={showLess}
              margin="0 20px"
              padding="10px 20px"
              background="lightGrey"
              hover={true}
            >SHOW LESS</ActualButton>}
          </Col>
          <Col sm={6}>
            <Button
              target="_blank"
              to={`https://www.instagram.com/${artist.instaUsername}/`}
              padding="10px 20px"
              background="lightGrey"
            ><Icon
                className="fa fa-external-link-alt"
                aria-hidden="true"
                addMarginRight="3px"
              />View Instagram Profile</Button>
          </Col>
        </Row>
      </Grid>
    </ColoredSection>
  );
};

export default Insta;
