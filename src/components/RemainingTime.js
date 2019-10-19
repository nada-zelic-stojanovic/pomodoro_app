import React from 'react';
import { Time, ClockBox } from '../uiComponents';

const RemainingTime = ({ remainingSeconds }) => {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  return (
    <div>
      <ClockBox>
        <Time>
          {minutes < 10 ? '0' + minutes : minutes} :{' '}
          {seconds < 10 ? '0' + seconds : seconds}
        </Time>
      </ClockBox>
    </div>
  );
};

export default RemainingTime;
