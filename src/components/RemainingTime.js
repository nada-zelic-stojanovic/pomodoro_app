import React from 'react';
import styled from 'styled-components';

const RemainingTime = ({ remainingSeconds, breakTime }) => {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  return (
    <div>
        <h2>{breakTime ? "BREAK" : "SESSION"}</h2>
      <Time>
        {minutes} : {seconds}
      </Time>
    </div>
  );
};

const Time = styled.div`
  font-size: 2rem;
`;

export default RemainingTime;
