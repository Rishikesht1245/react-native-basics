import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';

/* container to wrap all the screens*/
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import Home from './screens/Home';
import Details from './screens/Details';

// here we need to define the screens and the data we are passing to the screens
export type RootStackParamList = {
  // no prameter
  Home: undefined;
  // Details screen expects product ID to be passed
  Details: {productId: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
};

// we are using stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      {/* screen on initial render is mentioned here as initialRouteName */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Trending Products',
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            // this will appear as title as header
            title: 'Product Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
