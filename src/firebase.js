import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyD8PTxrVc-WFp-5iIWuw-A27DYZwU4A9NQ',
  authDomain: 'tomato-by-tsukuyomi.firebaseapp.com',
  databaseURL: 'https://tomato-by-tsukuyomi.firebaseio.com',
  projectId: 'tomato-by-tsukuyomi',
  storageBucket: '',
  messagingSenderId: '393034063321',
  appId: '1:393034063321:web:5d30568a0477eb60'
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export const saveSessionData = sessionLength => {
  const today = new Date().toDateString();
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      db.collection('sessions')
        .where('date', '==', today)
        .where('userId', '==', user.uid)
        .get()
        .then(response => {
          const { empty, docs } = response;
          if (empty) {
            db.collection('sessions').add({
              date: today,
              totalSessionCount: 1,
              totalTime: sessionLength,
              userId: user.uid
            });
          } else {
            const [doc] = docs;

            const log = {
              id: doc.id,
              totalSessionCount: doc.data().totalSessionCount,
              totalTime: doc.data().totalTime
            };
            db.collection('sessions')
              .doc(log.id)
              .update({
                totalSessionCount: log.totalSessionCount + 1,
                totalTime: log.totalTime + sessionLength
              });
          }
        });
    }
  });
};

export const saveUserSettings = (session, shortBreak, longBreak) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      db.collection('settings')
        .where('userId', '==', user.uid)
        .get()
        .then(response => {
          const { empty, docs } = response;
          if (empty) {
            db.collection('settings').add({
              userId: user.uid,
              sessionLength: session,
              shortBreakLength: shortBreak,
              longBreakLength: longBreak
            });
          } else {
            const [doc] = docs;
            const userSettings = {
              id: doc.id,
              sessionLength: doc.data().sessionLength,
              shortBreakLength: doc.data().shortBreakLength,
              longBreakLength: doc.data().longBreakLength
            };
            db.collection('settings')
              .doc(userSettings.id)
              .update({
                sessionLength: session,
                shortBreakLength: shortBreak,
                longBreakLength: longBreak
              });
          }
        });
    }
  });
};

export const provider = new firebase.auth.GoogleAuthProvider();
