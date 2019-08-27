import React from 'react';
import Pomodoro from './containers/Pomodoro/Pomodoro';
import ReactNotification from 'react-notifications-component';

function App() {

  return (
    <div>
      <ReactNotification />
      <Pomodoro  />
    </div>
  );
}

export default App;
