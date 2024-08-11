import React from "react";

import {
  // like a div
  View,
  Text, 
  // avoid the notches
  SafeAreaView
} from "react-native";

function App (){
  return (

  // area not overlapped by the hardware futures like home button
  <SafeAreaView>
    <View>
      <Text>Hell world !</Text>
      <Text>Hell world !</Text>
      <Text>Hell world !</Text>
      <Text>Hell world !</Text>
    </View>
  </SafeAreaView>
  )
}

export default App