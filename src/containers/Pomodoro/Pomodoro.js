import React, { Component } from 'react';
import RemainingTime from './../../components/RemainingTime';
import styled from 'styled-components';
import Sound from 'react-sound';
import gongSound from './../../assets/gong.mp3';
import bongSound from './../../assets/bong.mp3';

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
    sessionSoundStatus: Sound.status.STOPPED,
    isBreak: false,
    breakSoundStatus: Sound.status.STOPPED
  };

  componentDidMount = () => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  };
  
  startTimer = isBreak => {
    if (!isBreak) {
      this.setState({ timerIsRunning: true, isBreak });
      const timer = setInterval(() => {
        const { seconds } = this.state;
        this.setState({ seconds: seconds - 1 });
      }, 1000);

      const { seconds } = this.state;
      setTimeout(() => {
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
          sessionSoundStatus: Sound.status.PLAYING,
          isBreak: true
        });
        this.startTimer(true);
      }, seconds * 1000);
    } else if (isBreak) {

      this.setState({ timerIsRunning: true, seconds: 3 });
      const timer = setInterval(() => {
        const { seconds } = this.state;
        this.setState({ seconds: seconds - 1 });
      }, 1000);
      
      const { seconds } = this.state;
      setTimeout(() => {
        clearInterval(timer);
        this.setState({
          timerIsRunning: false,
          seconds: 5,
          isBreak: false,
          breakSoundStatus: Sound.status.PLAYING
        });
      }, seconds * 1000);
    }
  };

  handleStartButton = () => {
    this.startTimer(false);
  };

  

  stopSessionEndingSound = () => {
    this.setState({ sessionSoundStatus: Sound.status.STOPPED });
  };

  stopBreakEndingSound = () => {
    this.setState({ breakSoundStatus: Sound.status.STOPPED });
  }

  render() {
    const { seconds, timerIsRunning, sessionSoundStatus, isBreak, breakSoundStatus } = this.state;

    return (
      <TimerBox>
        <RemainingTime remainingSeconds={seconds} />
        <Sound
          url={gongSound}
          playStatus={sessionSoundStatus}
          onFinishedPlaying={this.stopSessionEndingSound}
        />
        <Sound
          url={bongSound}
          playStatus={breakSoundStatus}
          onFinishedPlaying={this.stopBreakEndingSound}
        />
        <Button onClick={this.handleStartButton} disabled={timerIsRunning}>
          start
        </Button>
      </TimerBox>
    );
  }
}

export default Pomodoro;
