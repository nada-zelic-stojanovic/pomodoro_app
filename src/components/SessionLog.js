import React, { Component } from 'react';
import { db } from '../firebase';
import {
  SessionBox,
  SessionList,
  ReturnButton,
  RedText
} from '../uiComponents';
import firebase from 'firebase';

class SessionLog extends Component {
  state = {
    logs: []
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        db.collection('sessions')
          .get()
          .then(snapshot => {
            const logs = snapshot.docs.map(doc => ({
              id: doc.id,
              userId: doc.data().userId,
              date: doc.data().date,
              totalSessionCount: doc.data().totalSessionCount,
              totalTime: parseInt(doc.data().totalTime)
            }));
            const userLogs = logs.filter(log => log.userId === user.uid);
            this.setState({ logs: userLogs });
          });
      } else {
        this.setState({ logs: [] });
      }
    });
  };

  render() {
    const { logs } = this.state;

    return (
      <SessionBox>
        <ReturnButton onClick={this.props.returnToTimer}>Return</ReturnButton>
        <SessionList>
          {logs.map(log => (
            <li key={log.id}>
              {log.date}
              {'  '}
              <RedText>||</RedText>
              {'  '}
              Total sessions: {'  '}
              {log.totalSessionCount}
              {'  '}
              <RedText>||</RedText>
              {'  '}
              Total time:{'  '}
              {log.totalTime}
            </li>
          ))}
        </SessionList>
      </SessionBox>
    );
  }
}

export default SessionLog;
