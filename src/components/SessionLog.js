import React, { Component } from 'react';
import { db } from './../firebaseStuff';
import styled from 'styled-components';

const SessionList = styled.ul``;

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
    const {dayLog, dates} = this.state;

    return (
      <div>
        <button onClick={this.props.returnToTimer}>Return</button>
        <ul>
          {dates.map((date, index) => (
            <li key={index}>
              {date} || 
              Total sessions:{' '}
              {dayLog.map(entry => entry.date === date).length} ||
              Total time:{' '}
              {dayLog
                .filter(entry => entry.date === date)
                .map(entry => entry.length)
                .reduce((acc, cur) => acc + cur, 0)}{' minutes'}
            </li>
          ))}
        </ul> 
      </div>
    );
  }
}

export default SessionLog;
