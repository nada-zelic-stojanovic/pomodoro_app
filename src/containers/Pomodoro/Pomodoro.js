import React, { Component } from 'react';
import RemainingTime from './../../components/RemainingTime';
import styled from 'styled-components';

const TimerBox = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const StartButton = styled.button``;
const StopButton = styled.button``;
const PauseButton = styled.button``;
const ResetButton = styled.button``;

class Pomodoro extends Component {
  state = {
    timerIsRunning: false,
    seconds: 3
  };

  handleStartButton = () => {
    this.setState({timerIsRunning: true})
    const timer = setInterval(() => {
      const { seconds } = this.state;
      this.setState({seconds: seconds - 1 });
    }, 1000);

    const { seconds } = this.state;
    const timeout = setTimeout(() => {
      clearInterval(timer);
     
      this.setState({timerIsRunning: false, seconds: seconds})
    }, seconds * 1000);
  };

  render() {
    const { seconds, timerIsRunning } = this.state;
    return (
      <TimerBox>
        <RemainingTime remainingSeconds={seconds} />
        <StartButton onClick={this.handleStartButton} disabled={timerIsRunning}>start</StartButton>
      </TimerBox>
    );
  }
}

export default Pomodoro;
