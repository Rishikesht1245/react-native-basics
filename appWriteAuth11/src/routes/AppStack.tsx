// app lies here

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Home from '../screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

// name and param list for routes
export type AppStackParamList = {
  Home: undefined;
};

// creating stack
const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
