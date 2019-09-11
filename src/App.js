import React from 'react';
import Pomodoro from './containers/Pomodoro/Pomodoro';
//import firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: 'AIzaSyD8PTxrVc-WFp-5iIWuw-A27DYZwU4A9NQ',
//   authDomain: 'tomato-by-tsukuyomi.firebaseapp.com',
//   databaseURL: 'https://tomato-by-tsukuyomi.firebaseio.com',
//   projectId: 'tomato-by-tsukuyomi',
//   storageBucket: '',
//   messagingSenderId: '393034063321',
//   appId: '1:393034063321:web:5d30568a0477eb60'
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();

// db.collection('sessions').add({
//   date: new Date(),
//   count: 144,
//   asdf: 'kurac'
// })

// db.collection('tomato-by')

function App() {

  return (
    <div>
      <Pomodoro  />
    </div>
  );
}

export default App;
