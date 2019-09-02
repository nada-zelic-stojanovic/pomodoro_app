import React, { Component } from 'react';
import RemainingTime from './../../components/RemainingTime';
import styled from 'styled-components';
import Sound from 'react-sound';
import gongSound from './../../assets/gong.mp3';
import bongSound from './../../assets/bong.mp3';
import Settings from './../../components/Settings';

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

const SESSION_LENGTH = 25;
const SHORT_BREAK_LENGTH = 5;
const LONG_BREAK_LENGTH = 15;

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerIsRunning: false,
      seconds: SESSION_LENGTH,
      sessionSoundStatus: Sound.status.STOPPED,
      isBreak: false,
      breakSoundStatus: Sound.status.STOPPED,
      sessionCount: 0,
      isPaused: false,
      sessionLength: SESSION_LENGTH,
      shortBreakLength: SHORT_BREAK_LENGTH,
      longBreakLength: LONG_BREAK_LENGTH,
      settingsOn: false
    };
  }

  componentDidMount = () => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  };

  startTimer = isBreak => {
    const {
      sessionCount,
      sessionLength,
      longBreakLength,
      shortBreakLength
    } = this.state;

    const breakLength =
      sessionCount % 4 === 0 ? longBreakLength : shortBreakLength;
    const seconds = isBreak ? breakLength : sessionLength;

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
        seconds: isBreak ? this.state.sessionLength : 0
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
    const { sessionCount, isBreak, sessionLength } = this.state;
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    this.setState({
      timerIsRunning: false,
      isBreak: false,
      seconds: sessionLength,
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

  showSettings = () => {
    this.setState({ settingsOn: true });
  };

  handleSettingsApply = (sessionLength, shortBreakLength, longBreakLength) => {
    this.setState({
      sessionLength: sessionLength,
      shortBreakLength: shortBreakLength,
      longBreakLength: longBreakLength,
      seconds: sessionLength,
      settingsOn: false
    });
  };

  handleCancel = () => {
    this.setState({
      settingsOn: false
    });
  };

  render() {
    const {
      seconds,
      timerIsRunning,
      sessionSoundStatus,
      isBreak,
      breakSoundStatus,
      sessionCount,
      isPaused,
      sessionLength,
      shortBreakLength,
      longBreakLength,
      settingsOn
    } = this.state;

    return settingsOn ? (
      <TimerBox>
        <Settings
          sessionLength={sessionLength}
          shortBreakLength={shortBreakLength}
          longBreakLength={longBreakLength}
          applySettings={this.handleSettingsApply}
          cancelSettings={this.handleCancel}
        />
      </TimerBox>
    ) : (
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
        <Button onClick={isPaused ? this.unpause : this.pause}>
          {isPaused ? 'resume' : 'pause'}
        </Button>
        <br />
        <button onClick={this.showSettings} disabled={timerIsRunning}>Settings</button>
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
