import React, { Component } from 'react';
import RemainingTime from './../../components/RemainingTime';
import styled from 'styled-components';
import Sound from 'react-sound';
import gongSound from './../../assets/gong.mp3';
import bongSound from './../../assets/bong.mp3';
import Settings from './../../components/Settings';

import './Pomodoro.css';

const TimerBox = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const ControlButton = styled.button`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border-style: none;
  background-color: rgb(204, 0, 0);
  font-weight: 900;
  font-family: 'Lato', sans-serif;
  color: rgb(255, 255, 204);
  box-shadow: 2px 2px rgb(153, 0, 0);
  margin: 3px;
  text-align: center;

  :hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,.5);
  }
`;

const Button = styled.button`
  background-color: rgb(0, 51, 0);
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
    box-shadow: 0 10px 20px rgba(0,0,0,.5);
  }
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
      settingsOn: false,
      sessionLogOn: false
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

  showSessionLog = () => {
    this.setState({ sessionLogOn: true });
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
      settingsOn, sessionLogOn
    } = this.state;

    let currentPage;
    if(settingsOn && !sessionLogOn) {
      currentPage = (
        <TimerBox>
        <Settings
          sessionLength={sessionLength}
          shortBreakLength={shortBreakLength}
          longBreakLength={longBreakLength}
          applySettings={this.handleSettingsApply}
          cancelSettings={this.handleCancel}
        />
      </TimerBox>
      )
    } else if (sessionLogOn && !settingsOn) {
      currentPage = (
        <TimerBox>
          
        </TimerBox>
      )
    } else {
      currentPage = (
        <TimerBox>
        <h1>{isBreak && sessionCount % 4 === 0 && 'LONG'}</h1>
        <h1>{isBreak ? 'BREAK' : 'SESSION'}</h1>
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
        <ControlButton onClick={this.handleStartButton} disabled={timerIsRunning}>
          START
        </ControlButton>
        <ControlButton onClick={this.handleStopButton}>STOP</ControlButton>
        <ControlButton onClick={isPaused ? this.unpause : this.pause}>
          {isPaused ? 'RESUME' : 'PAUSE'}
        </ControlButton>
        <br />
        <Button onClick={this.showSettings} disabled={timerIsRunning} style={{float: 'left'}}>
          Settings
        </Button>
        <Button onClick={this.showSessionLog} style={{float: 'right'}}>Session Log</Button>
      </TimerBox>
      )
    }

    return (
      <div>
        {currentPage}
      </div>
    )
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
