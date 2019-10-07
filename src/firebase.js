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

export const saveSessionData = (userId, sessionLength) => {
  const today = new Date().toDateString();
  db.collection('sessions')
    .where('date', '==', today)
    .where('userId', '==', userId)
    .get()
    .then(response => {
      const { empty, docs } = response;
      if (empty) {
        db.collection('sessions').add({
          date: today,
          totalSessionCount: 1,
          totalTime: parseInt(sessionLength),
          userId: userId
        });
      } else {
        const [doc] = docs;

        const log = {
          id: doc.id,
          totalSessionCount: doc.data().totalSessionCount,
          totalTime: parseInt(doc.data().totalTime)
        };
        db.collection('sessions')
          .doc(log.id)
          .update({
            totalSessionCount: log.totalSessionCount + 1,
            totalTime: log.totalTime + parseInt(sessionLength)
          });
      }
    });
};

export const saveUserSettings = (
  userId,
  { sessionLength, shortBreakLength, longBreakLength }
) => {
  db.collection('settings')
    .where('userId', '==', userId)
    .get()
    .then(response => {
      const { empty, docs } = response;
      if (empty) {
        db.collection('settings').add({
          userId: userId,
          sessionLength,
          shortBreakLength,
          longBreakLength
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
            sessionLength,
            shortBreakLength,
            longBreakLength
          });
      }
    });
};

export const loadUserSettings = userId => {
  db.collection('settings')
    .where('userId', '==', userId)
    .get()
    .then(snapshot => {
      const settings = snapshot.docs.map(doc => ({
        id: doc.id,
        userId: doc.data().userId,
        sessionLength: doc.data().sessionLength,
        shortBreakLength: doc.data().shortBreakLength,
        longBreakLength: doc.data().longBreakLength
      }));
      const [setting] = settings;
      this.setState({
        seconds: Number(setting.sessionLength),
        sessionLength: Number(setting.sessionLength),
        shortBreakLength: Number(setting.shortBreakLength),
        longBreakLength: Number(setting.longBreakLength)
      });
    });
};

export const provider = new firebase.auth.GoogleAuthProvider();
