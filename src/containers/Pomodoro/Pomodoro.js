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

const SESSION_LENGTH = 2;
const SHORT_BREAK_LENGTH = 1;
const LONG_BREAK_LENGTH = 5;

class Pomodoro extends Component {
  state = {
    timerIsRunning: false,
    seconds: SESSION_LENGTH,
    sessionSoundStatus: Sound.status.STOPPED,
    isBreak: false,
    breakSoundStatus: Sound.status.STOPPED,
    sessionCount: 0
  };

  componentDidMount = () => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  };

  startTimer = isBreak => {
    const { sessionCount } = this.state;
    const breakLength =
      sessionCount % 4 === 0 ? LONG_BREAK_LENGTH : SHORT_BREAK_LENGTH;
    const seconds = isBreak ? breakLength : SESSION_LENGTH;
    this.setState({
      sessionCount: !isBreak ? sessionCount + 1 : sessionCount
    });
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
      breakSoundStatus,
      sessionCount
    } = this.state;

    const currentSessionNumber =
      `Current session number: ${sessionCount}`;
    const completedSessions = `Completed  ${sessionCount} sessions`;

    return (
      <TimerBox>
        <h2>{isBreak && sessionCount % 4 === 0 && 'LONG'}</h2>
        <h2>{isBreak ? 'BREAK' : 'SESSION'}</h2>
        <RemainingTime remainingSeconds={seconds} />
        <h4>
          {!isBreak
            ? timerIsRunning
              ? currentSessionNumber
              : completedSessions
            : currentSessionNumber % 4 === 0
            ? null
            : completedSessions}
        </h4>

        {/* <Sound
          url={gongSound}
          playStatus={sessionSoundStatus}
          onFinishedPlaying={this.stopSessionEndingSound}
        />
        <Sound
          url={bongSound}
          playStatus={breakSoundStatus}
          onFinishedPlaying={this.stopBreakEndingSound}
        /> */}
        <Button onClick={this.handleStartButton} disabled={timerIsRunning}>
          start
        </Button>
      </TimerBox>
    );
  }
}

export default Pomodoro;
