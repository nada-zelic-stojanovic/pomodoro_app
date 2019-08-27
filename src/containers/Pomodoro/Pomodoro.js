import React, { Component } from 'react';
import RemainingTime from './../../components/RemainingTime';
import styled from 'styled-components';
import Sound from 'react-sound';
import gongSound from './../../assets/gong.mp3';

const TimerBox = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Button = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border-style: none;
`;

class Pomodoro extends Component {
  state = {
    timerIsRunning: false,
    seconds: 5,
    sessionEndSound: Sound.status.STOPPED
  };

  handleStartButton = () => {
    this.setState({ timerIsRunning: true, sessionEndSound: Sound.status.STOPPED });
    const timer = setInterval(() => {
      const { seconds } = this.state;
      this.setState({ seconds: seconds - 1 });
    }, 1000);

    const { seconds } = this.state;
    const timeout = setTimeout(() => {
      clearInterval(timer);
      this.setState({ timerIsRunning: false, seconds: seconds, sessionEndSound: Sound.status.PLAYING });
    }, seconds * 1000);
  };


  render() {
    const { seconds, timerIsRunning, sessionEndSound } = this.state;
    return (
      <TimerBox>
        <RemainingTime remainingSeconds={seconds} />
        <Sound url={gongSound} playStatus={sessionEndSound}/>
        <Button onClick={this.handleStartButton} disabled={timerIsRunning}>
          start
        </Button>
      </TimerBox>
    );
  }
}

export default Pomodoro;
