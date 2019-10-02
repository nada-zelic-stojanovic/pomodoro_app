import React, { Component } from 'react';
import firebase from 'firebase';
import { provider } from '../firebase';
import {
  Button,
  HeaderSignInBox,
  HeaderSignOutBox,
  SignOutButton
} from '../uiComponents';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      signedIn: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.setState({ currentUser: user, signedIn: true });
      } else {
        // No user is signed in.
        this.setState({ currentUser: null, signedIn: false });
      }
    });
  }

  signIn = () => {
    let { currentUser } = this.state;
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        currentUser = result.user;
        this.setState({ currentUser: currentUser, signedIn: true });
      })
      .catch(function(error) {
        // Handle Errors here.
        // let errorCode = error.code;
        //let errorMessage = error.message;
        // The email of the user's account used.
        //let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        //let credential = error.credential;
        // ...
      });
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ signedIn: false, currentUser: null });
        alert('Signed Out successfully');
      })
      .catch(error => {
        alert('Something went wrong..');
      });
  };

  render() {
    const { currentUser, signedIn } = this.state;
    return (
      <div>
        {signedIn ? (
          <HeaderSignOutBox>
            <SignOutButton onClick={this.signOut}>Sign Out</SignOutButton>
            <p>Logged in as {currentUser.displayName}</p>
          </HeaderSignOutBox>
        ) : (
          <HeaderSignInBox>
            <Button onClick={this.signIn}>Sign In</Button>
          </HeaderSignInBox>
        )}
      </div>
    );
  }
}

export default Header;
