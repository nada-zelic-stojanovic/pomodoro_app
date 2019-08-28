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
    sessionSoundStatus: Sound.status.STOPPED
  };

  componentDidMount = () => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
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
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          console.log('asdf');
          const notification = new Notification(
            "Session expired! It's break time!"
          );
        } else {
          console.log('Permission to show notifications denied :(');
        }
      }
      this.setState({
        timerIsRunning: false,
        seconds: seconds,
        sessionSoundStatus: Sound.status.PLAYING
      });
    }, seconds * 1000);
  };

  stopSessionEndingSound = () => {
    this.setState({ sessionSoundStatus: Sound.status.STOPPED });
  };

  render() {
    const { seconds, timerIsRunning, sessionSoundStatus } = this.state;
    return (
      <TimerBox>
        <RemainingTime remainingSeconds={seconds} />
        <Sound
          url={gongSound}
          playStatus={sessionSoundStatus}
          onFinishedPlaying={this.stopSessionEndingSound}
        />
        <Button onClick={this.handleStartButton} disabled={timerIsRunning}>
          start
        </Button>
      </TimerBox>
    );
  }
}

export default Pomodoro;
