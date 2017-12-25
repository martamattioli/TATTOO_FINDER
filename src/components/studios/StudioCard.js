import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Card from '../elements/divs/Card';
import AbsolutelyPosition from '../elements/divs/AbsolutelyPosition';
import ActualButton from '../elements/buttons/ActualButton';
import Icon from '../elements/icons/Icon';

const StudioCard = ({location, studio, removeLocation}) => {
  return(
    <Card
      border="solid 4px black"
      radius="4px"
      hoverColor="darkerGrey"
      align="center"
      style={{position: 'relative'}}
      background={`url(${studio.image[0]})`}
      // onClick={() => this.props.history.push(`/studios/${location.studioEvent.id}`)}
    >
      <Link to={`/studios/${studio.id}`}>
        <AbsolutelyPosition
          textAlign="left"
          bottom="10px"
          width="100%"
          background="rgba(255, 255, 255, 0.8)"
          padding="5px 10px"
        >
          <h4 style={{width: '90%'}}>{studio.name}</h4>
          {location && <div>{ location.resident && <p>Resident</p>}
            { location.startDate && <p>{moment(location.startDate).format('DD-MM-YYYY')} - {moment(location.endDate).format('DD-MM-YYYY')}</p>}
          </div>}
          { !location && <p>{studio.artists.length} artists</p>}
        </AbsolutelyPosition>
      </Link>
      {location && <AbsolutelyPosition
        bottom="10px"
        right="10px"
        onClick={() => removeLocation(location.id)}
      ><ActualButton
          margin="0"
          background="transparent"
        ><Icon
            className="fa fa-trash"
            aria-hidden="true"
            hoverColor="red"
            hover={true}
          />
        </ActualButton>
      </AbsolutelyPosition>}
    </Card>
  );
};

export default StudioCard;
