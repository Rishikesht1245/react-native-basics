// auth route
// app lies here

import {StyleSheet} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

// name and param list for routes
export type AuthStackParamList = {
  SignUp: undefined;
  Login: undefined;
};

// creating stack
const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Login" component={Login} options={{title: 'Login'}} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: 'Sign Up'}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
