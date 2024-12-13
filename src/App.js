import './App.css';
import React from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import UserComponent from './UserComponent';
import SearchComponent from './SearchComponent';

const App = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  React.useEffect(() => {
    if (isAuthenticated && user) {
      // Call your API to create a new user if it's the first time
      console.log(user.user_metadata);
      const user_metadata = user.user_metadata;

      const authenticatedUser = {
        email: user.email,
        name: user_metadata?.full_name,
        phone_number: user_metadata?.phone_number.number,
        city: user_metadata?.city,
        sports: user_metadata?.sports
      };

      console.log(authenticatedUser);
      axios.post(`${process.env.REACT_APP_API_URI}/api/v1/user`, authenticatedUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('User created successfully', response.data);
      })
      .catch(err => {
        console.error('Failed to create user', err);
      });
    }
  }, [isAuthenticated, user]);

  return (
    <div>
      <h1>The Bench</h1>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      ) : (
        <>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
          <UserComponent />
          <SearchComponent />
        </>
      )}
    </div>
  );
};

export default App;
