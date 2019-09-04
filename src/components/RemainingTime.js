import React from 'react';
import styled from 'styled-components';

const RemainingTime = ({ remainingSeconds }) => {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  return (
    <div>
      <ClockBox>
        <Time>
          {minutes} : {seconds}
        </Time>
      </ClockBox>
    </div>
  );
};

const Time = styled.div`
  font-size: 2.8em;
`;
const ClockBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 50px;
  box-shadow: 2px 2px rgb(0, 51, 0)
`;

export default RemainingTime;
