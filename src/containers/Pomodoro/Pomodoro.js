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

const SESSION_LENGTH = 5;
const BREAK_LENGTH = 3;

class Pomodoro extends Component {
  state = {
    timerIsRunning: false,
    seconds: SESSION_LENGTH,
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
    const seconds = isBreak ? BREAK_LENGTH : SESSION_LENGTH;
    this.setState({
      timerIsRunning: true,
      isBreak,
      seconds
    });

    const timer = setInterval(() => {
      const { seconds } = this.state;
      this.setState({ seconds: seconds - 1 });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);

      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          if (isBreak) {
            const notification = new Notification('Break time is over!');
          } else {
            const notification = new Notification(
              "Session expired! It's break time!"
            );
          }
        } else {
          console.log('Permission to show notifications denied :(');
        }
      }

      this.setState({
        timerIsRunning: false,
        sessionSoundStatus: !isBreak ? Sound.status.PLAYING : null,
        breakSoundStatus: isBreak ? Sound.status.PLAYING : null,
        isBreak: !this.state.isBreak,
        seconds: isBreak ? SESSION_LENGTH : 0
      });

      if (!isBreak) {
        this.startTimer(!isBreak);
      }
    }, seconds * 1000);
  };

  handleStartButton = () => {
    this.startTimer(false);
  };

  stopSessionEndingSound = () => {
    this.setState({ sessionSoundStatus: Sound.status.STOPPED });
  };

  stopBreakEndingSound = () => {
    this.setState({ breakSoundStatus: Sound.status.STOPPED });
  };

  render() {
    const {
      seconds,
      timerIsRunning,
      sessionSoundStatus,
      isBreak,
      breakSoundStatus
    } = this.state;

    return (
      <TimerBox>
        <h2>{isBreak ? "BREAK" : "SESSION"}</h2>
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
