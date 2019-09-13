import React, { Component } from 'react';
import { db } from '../firebase';
import { SessionBox, SessionList, Button, RedText } from '../uiComponents';

class SessionLog extends Component {
  state = {
    logs: []
  };

  componentDidMount = () => {
    db.collection('sessions')
      .get()
      .then(snapshot => {
        const logs = snapshot.docs.map(doc => ({
          id: doc.id,
          date: doc.data().date,
          totalSessionCount: doc.data().totalSessionCount,
          totalTime: parseInt(doc.data().totalTime)
        }));
        this.setState({logs: logs});
      });
  };

  render() {
    const { logs } = this.state;

    return (
      <SessionBox>
        <Button onClick={this.props.returnToTimer}>Return</Button>
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
