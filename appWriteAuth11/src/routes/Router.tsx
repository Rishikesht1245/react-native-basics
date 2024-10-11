// here we will check if the user is logged in or not
// if user is logged in we send the user to the app stack
// if the user is not logged in we send the user to the auth stack.

import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Loading from '../components/Loading';

// context
import {appWriteContext} from '../appwrite/appwriteContext';

// routes
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Router = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // consuming value from the context
  const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(appWriteContext);

  // finding the user is logged in or not
  useEffect(() => {
    // get current user return the current user if user is logged in appwrite
    appwrite
      .getCurrentUser()
      .then(response => {
        setIsLoading(false);
        if (response) {
          setIsLoggedIn(true);
        }
      })
      .catch(error => {
        console.log('Error in Router :: ', error?.message);
        setIsLoading(false);
        setIsLoggedIn(false);
      });
  }, [appwrite, setIsLoading]);

  if (isLoading) <Loading />;

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
