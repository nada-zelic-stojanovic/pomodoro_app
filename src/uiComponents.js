import styled from 'styled-components';

//Pomodoro
export const TimerBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const ControlButton = styled.button`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border-style: none;
  background-color: rgb(204, 68, 0);
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
  background-color: rgb(0, 102, 102);
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
  border-radius: 10px;
  border-color: rgb(0, 102, 102);
  border-style: solid;
  border-width: 2px;
`;

//SessionLog
export const SessionBox = styled.div`
  position: absolute;
  top: 10%;
  left: 5%;
`;
export const SessionList = styled.ul`
  list-style-type: circle;
`;

export const RedText = styled.span`
  color: rgb(204, 0, 0);
`;

export const ReturnButton = styled(Button)`
  height: 25px;
  margin: 15px;
`;

//Settings
export const CancelButton = styled(Button)`
  background-color: rgb(0, 179, 179);
`;

export const SettingsBox = styled.div`
  font-size: 1.8em;
  margin: 15px 5px;
  line-height: 1.6;
`;

export const Select = styled.select`
  padding: 2px 5px 2px 12px;
  width: 70px;
  height: 40px;
  border-radius: 10px;
  border-color: rgb(0, 102, 102);
  border-style: solid;
  border-width: 2.5px;
  font-size: 18px;
  float: right;
  margin-top: 5px;
`;

//Header
export const HeaderSignInBox = styled.div`
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const HeaderSignOutBox = styled(HeaderSignInBox)`
  top: 8%;
`;

export const SignOutButton = styled(Button)`
  background-color: rgb(204, 68, 0);
  height: 30px;
  margin: 5px;
`;
