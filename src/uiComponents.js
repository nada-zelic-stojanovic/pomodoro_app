import styled from 'styled-components';

//Pomodoro
export const TimerBox = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const ControlButton = styled.button`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border-style: none;
  background-color: rgb(204, 0, 0);
  font-weight: 900;
  font-family: 'Lato', sans-serif;
  color: rgb(255, 255, 204);
  box-shadow: 2px 2px rgb(153, 0, 0);
  margin: 3px;
  text-align: center;

  :hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }

  :active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const Button = styled.button`
  background-color: rgb(0, 51, 0);
  border-style: none;
  margin: 20px 5px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  height: 50px;
  width: 110px;
  border-style: none;
  border-radius: 10px;
  color: rgb(255, 255, 204);
  text-transform: uppercase;

  :hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }

  :active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

//RemainingTime
export const Time = styled.div`
  font-size: 2.8em;
`;
export const ClockBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 50px;
  box-shadow: 2px 2px rgb(0, 51, 0);
`;

//SessionLog
export const SessionBox = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
`;
export const SessionList = styled.ul`
  list-style-type: circle;
`;

