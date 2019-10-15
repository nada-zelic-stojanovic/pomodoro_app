import React, { Component } from 'react';
import Pomodoro from './containers/Pomodoro/Pomodoro';
import Header from './containers/Header';
import { provider } from './firebase';
import firebase from 'firebase';

class App extends Component {
  state = {
    user: null,
    loadingUser: true
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user,
          loadingUser: false
        });
      } else {
        this.setState({
          user: null,
          loadingUser: false
        });
      }
    });
  }

  signIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const token = result.credential.accessToken;

        const user = result.user;
        this.setState({ user });
      })
      .catch(function(error) {
        alert(error);
      });
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ user: null });
        alert('Signed Out successfully');
      })
      .catch(error => {
        alert('Something went wrong..');
      });
  };

  render() {
    const { user, loadingUser } = this.state;
    return (
      <div>
        <Header
          user={user}
          loadingUser={loadingUser}
          signIn={this.signIn}
          signOut={this.signOut}
        />
        <Pomodoro user={user} />
      </div>
    );
  }
}

export default App;
