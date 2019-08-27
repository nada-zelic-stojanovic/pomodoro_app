import React, { Component } from 'react';
import RemainingTime from './../../components/RemainingTime';
import styled from 'styled-components';
import Sound from 'react-sound';
import gongSound from './../../assets/gong.mp3';
import { store } from 'react-notifications-component';

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
    sessionSoundStatus: Sound.status.STOPPED
  };

  handleStartButton = () => {
    this.setState({ timerIsRunning: true });
    const timer = setInterval(() => {
      const { seconds } = this.state;
      this.setState({ seconds: seconds - 1 });
    }, 1000);

    const { seconds } = this.state;
    const timeout = setTimeout(() => {
      clearInterval(timer);
      store.addNotification({
        title: "Session timeout!",
        message: "It's break time!",
        type: "success",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
      this.setState({ timerIsRunning: false, seconds: seconds, sessionSoundStatus: Sound.status.PLAYING });
    }, seconds * 1000);
  };

  stopSessionEndingSound = () => {
    this.setState({sessionSoundStatus: Sound.status.STOPPED});
  }


  render() {
    const { seconds, timerIsRunning, sessionSoundStatus } = this.state;
    return (
      <TimerBox>
        <RemainingTime remainingSeconds={seconds} />
        <Sound url={gongSound} playStatus={sessionSoundStatus} onFinishedPlaying={this.stopSessionEndingSound} />
        <Button onClick={this.handleStartButton} disabled={timerIsRunning}>
          start
        </Button>
      </TimerBox>
    );
  }
}

export default Pomodoro;
