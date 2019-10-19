import React from 'react';
import { Time, ClockBox } from '../uiComponents';
import { convertSecondsToMinutes } from '../utils';

const RemainingTime = ({ remainingSeconds }) => {
  const time = convertSecondsToMinutes(remainingSeconds);
  const { minutes, seconds } = time;
  return (
    <div>
      <ClockBox>
        <Time>
          {String(minutes).padStart(2, '0')} :{' '}
          {String(seconds).padStart(2, '0')}
        </Time>
      </ClockBox>
    </div>
  );
};

export default RemainingTime;
