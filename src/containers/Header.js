import React from 'react';
import {
  Button,
  HeaderSignInBox,
  HeaderSignOutBox,
  SignOutButton
} from '../uiComponents';

const Header = ({ user, loadingUser, signOut, signIn }) => {
  return (
    !loadingUser && (
      <div>
        {user !== null ? (
          <HeaderSignOutBox>
            <SignOutButton onClick={signOut}>Sign Out</SignOutButton>
            <p>Logged in as {user.displayName}</p>
          </HeaderSignOutBox>
        ) : (
          <HeaderSignInBox>
            <Button onClick={signIn}>Sign In</Button>
          </HeaderSignInBox>
        )}
      </div>
    )
  );
};

export default Header;
