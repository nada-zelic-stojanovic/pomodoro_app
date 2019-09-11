import React, { Component } from 'react';
import { db } from './../firebaseStuff';
import { SessionBox, SessionList, Button } from '../styledComponents';

class SessionLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayLog: [],
      dates: []
    };
  }

  componentDidMount = () => {
    const { dayLog, dates } = this.state;
    db.collection('sessions')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const log = {
            id: doc.id,
            count: doc.data().count,
            date: doc.data().date,
            length: parseInt(doc.data().length)
          };
          dayLog.push(log);
          if (!dates.includes(log.date)) {
            dates.push(log.date);
          }
          this.setState({ dayLog: dayLog });
        });
      })
      .catch(e => console.log(e));
  };

  render() {
    const { dayLog, dates } = this.state;

    return (
      <SessionBox>
        <Button onClick={this.props.returnToTimer} styles={{
          position: 'absolute', 
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'}}>Return
        </Button>
        <SessionList>
          {dates.map((date, index) => (
            <li key={index}>
              {date} {'  '}
              <span style={{ color: 'rgb(204, 0, 0)' }}>||</span> {'  '}
              Total sessions: {'  '}
              {dayLog.map(entry => entry.date === date).length}{' '}
              <span style={{ color: 'rgb(204, 0, 0)' }}>||</span>{'  '}
              Total time:{'  '}
              {dayLog
                .filter(entry => entry.date === date)
                .map(entry => entry.length)
                .reduce((acc, cur) => acc + cur, 0)}
              {' minutes'}
            </li>
          ))}
        </SessionList>
      </SessionBox>
    );
  }
}

export default SessionLog;
