import React from 'react';
import { Time, ClockBox } from '../uiComponents';
import { createTimeString } from '../utils';

const RemainingTime = ({ remainingSeconds }) => {
  return (
    <div>
      <ClockBox>
        <Time>{createTimeString(remainingSeconds)}</Time>
      </ClockBox>
    </div>
  );
};

export default RemainingTime;
