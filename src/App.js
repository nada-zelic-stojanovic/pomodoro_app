import React from 'react';
//import Pomodoro from './containers/Pomodoro/Pomodoro';
import RemainingTime from './components/RemainingTime';


function App() {

  return (
    <div>
      <RemainingTime remainingSeconds='200' />
    </div>
  );
}

export default App;
