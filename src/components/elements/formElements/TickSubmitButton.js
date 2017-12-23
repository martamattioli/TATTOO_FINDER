import React from 'react';
import ActualButton from '../buttons/ActualButton';
import Icon from '../icons/Icon';

const TickSubmitButton = () => {
  return(
    <ActualButton
      radius="50%"
      padding="5px 6px 1px 6px"
      background="green"
    ><Icon
        className="fa fa-check"
        color="white"
        hover={true}
      />
    </ActualButton>
  );
};

export default TickSubmitButton;
