import React, { Component } from 'react';
import { db } from '../firebase';
import { SessionBox, SessionList, Button } from '../uiComponents';

class SessionLog extends Component {
  state = {
    logs: []
  };

  componentDidMount = () => {
    const { logs } = this.state;
    db.collection('sessions')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const log = {
            id: doc.id,
            date: doc.data().date,
            totalSessionCount: doc.data().totalSessionCount,
            totalTime: parseInt(doc.data().totalTime)
          };
          logs.push(log);
          this.setState({ logs: logs });
        });
      })
      .catch(e => console.log(e));
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
              <span className='redText'>||</span>
              {'  '}
              Total sessions: {'  '}
              {log.totalSessionCount}
              {'  '}
              <span className='redText'>||</span>
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
