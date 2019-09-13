import React from 'react';
import {TimerBox, ControlButton, Button} from '../uiComponents';
import RemainingTime from './RemainingTime';

const Timer = ({
  isBreak, sessionCount, seconds, isPaused, timerIsRunning, 
  handleStartButton, handleStopButton, pause, unpause, showSessionLog, showSettings
}) => {
  return (
    <TimerBox>
        <h1>{isBreak && sessionCount % 4 === 0 && 'LONG'}</h1>
        <h1>{isBreak ? 'BREAK' : 'SESSION'}</h1>
        <RemainingTime remainingSeconds={seconds} />
        <h4>
          {(timerIsRunning || isPaused) && !isBreak
            ? `Current session: ${sessionCount}`
            : `Completed  ${sessionCount} sessions`}
        </h4>
        <ControlButton onClick={handleStartButton} disabled={timerIsRunning}>
          START
        </ControlButton>
        <ControlButton onClick={handleStopButton} disabled={!timerIsRunning && !isPaused}>STOP</ControlButton>
        <ControlButton onClick={isPaused ? unpause : pause} disabled={!timerIsRunning && !isPaused}>
          {isPaused ? 'RESUME' : 'PAUSE'}
        </ControlButton>
        <br />
        <Button onClick={showSettings} disabled={timerIsRunning} style={{float: 'left'}}>
          Settings
        </Button>
        <Button onClick={showSessionLog} style={{float: 'right'}}>Session Log</Button>
      </TimerBox>
  )
};

export default Timer;