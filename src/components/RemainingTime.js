import React from 'react';
import { Time, ClockBox } from '../uiComponents';
import { convertSecondsToMinutes, createTimeString } from '../utils';

const RemainingTime = ({ remainingSeconds }) => {
  const time = convertSecondsToMinutes(remainingSeconds);
  const { minutes, seconds } = time;
  return (
    <div>
      <ClockBox>
        <Time>{createTimeString(minutes, seconds)}</Time>
      </ClockBox>
    </div>
  );
};

export default RemainingTime;
