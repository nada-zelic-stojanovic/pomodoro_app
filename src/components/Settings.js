import React, { Component } from 'react';
import styled from 'styled-components';
import {Button, CancelButton, Select} from '../uiComponents';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shortBreakLength: this.props.shortBreakLength,
      sessionLength: this.props.sessionLength,
      longBreakLength: this.props.longBreakLength
    };

  }

  handleChange = event => {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {sessionLength, shortBreakLength, longBreakLength} = this.state;
    this.props.applySettings(sessionLength, shortBreakLength, longBreakLength);
  };

  render() {

    let shortBreak = [];
    for (let i = 1; i < 11; i++) {
      shortBreak.push(
        <option value={i} key={'sb' + i}>
          {i}
        </option>
      );
    }

    let session = [];
    let longBreak = [];
    for (let i = 10; i < 31; i++) {
      longBreak.push(
        <option value={i} key={'lb' + i}>
          {i}
        </option>
      );
      session.push(<option value={i} key={'sl' + i}>
      {i}
    </option>)
    }
    return (
      <Select>
        <form onSubmit={this.handleSubmit}>
          <label>
            Session length:
            <select
              onChange={this.handleChange}
              name="sessionLength"
              value={this.state.sessionLength}
              className="selectSettings"
              dir='rtl'
            >
              {session}
            </select>
          </label>
          <br />
          <label>
            Short break length:
            <select
              onChange={this.handleChange}
              name="shortBreakLength"
              value={this.state.shortBreakLength}
              className="selectSettings"
              dir='rtl'
            >
              {shortBreak}
            </select>
          </label>
          <br />
          <label>
            Long break length:
            <select
              onChange={this.handleChange}
              name="longBreakLength"
              value={this.state.longBreakLength}
              className="selectSettings"
              dir='rtl'
            >
              {longBreak}
            </select>
          </label>
          <br />
          <Button type="submit">Apply</Button>
          <CancelButton onClick={this.props.cancelSettings}>Cancel</CancelButton>
        </form>
      </Select>
    );
  }
}

export default Settings;
