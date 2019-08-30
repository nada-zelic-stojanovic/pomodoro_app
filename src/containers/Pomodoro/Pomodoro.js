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

const SESSION_LENGTH = 8;
const SHORT_BREAK_LENGTH = 3;
const LONG_BREAK_LENGTH = 5;

class Pomodoro extends Component {
  state = {
    timerIsRunning: false,
    seconds: SESSION_LENGTH,
    sessionSoundStatus: Sound.status.STOPPED,
    isBreak: false,
    breakSoundStatus: Sound.status.STOPPED,
    sessionCount: 0,
    isPaused: false
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

    this.startIntervalAndTimeout(seconds, isBreak);
  };

  startIntervalAndTimeout = (seconds, isBreak) => {
    this.interval = setInterval(() => {
      const { seconds } = this.state;
      this.setState({ seconds: seconds - 1 });
    }, 1000);

    this.timeout = setTimeout(() => {
      clearInterval(this.interval);

      showNotification(isBreak);

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

  handleStopButton = () => {
    const { sessionCount, isBreak } = this.state;
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    this.setState({
      timerIsRunning: false,
      isBreak: false,
      seconds: SESSION_LENGTH,
      sessionCount: isBreak ? sessionCount : sessionCount - 1
    });
  };

  pause = () => {
    const { sessionCount, seconds } = this.state;
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    this.setState({
      timerIsRunning: false,
      seconds: seconds,
      sessionCount: sessionCount,
      isPaused: true
    });
  };

  unpause = () => {
    const { isBreak, seconds } = this.state;
    this.setState({ isPaused: false, timerIsRunning: true });
    this.startIntervalAndTimeout(seconds, isBreak);
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
      sessionCount,
      isPaused
    } = this.state;

    return (
      <TimerBox>
        <h2>{isBreak && sessionCount % 4 === 0 && 'LONG'}</h2>
        <h2>{isBreak ? 'BREAK' : 'SESSION'}</h2>
        <RemainingTime remainingSeconds={seconds} />
        <h4>
          {(timerIsRunning || isPaused) && !isBreak
            ? `Current session: ${sessionCount}`
            : `Completed  ${sessionCount} sessions`}
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
        <Button onClick={this.handleStopButton}>stop</Button>
        <Button onClick={isPaused? this.unpause : this.pause}>
          {isPaused ? 'resume' : 'pause'}
        </Button>
      </TimerBox>
    );
  }
}

const showNotification = isBreak => {
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
};

export default Pomodoro;
