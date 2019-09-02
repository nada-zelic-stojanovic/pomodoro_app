import React, { Component } from 'react';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shortBreakLength: this.props.shortBreakLength,
      sessionLength: this.props.sessionLength,
      longBreakLength: this.props.longBreakLength
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        <option value={i} selected={i === this.state.shortBreakLength}>
          {i}
        </option>
      );
    }

    let longBreak = [];
    for (let i = 10; i < 31; i++) {
      longBreak.push(
        <option value={i} selected={i === this.state.longBreakLength}>
          {i}
        </option>
      );
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Session length:
            <select
              onChange={this.handleChange}
              name="sessionLength"
              value={this.state.sessionLength}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </label>
          <br />
          <label>
            Short break length:
            <select
              onChange={this.handleChange}
              name="shortBreakLength"
              value={this.state.shortBreakLength}
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
            >
              {longBreak}
            </select>
          </label>
          <br />
          <input type="submit" value="Apply" />
          <button onClick={this.props.cancelSettings}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default Settings;
