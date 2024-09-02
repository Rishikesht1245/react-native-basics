import { ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren, useState } from 'react'
import { Image } from 'react-native'

import DiceOne from "./assets/dice-1.png"
import DiceTwo from "./assets/dice-2.png"
import DiceThree from "./assets/dice-3.png"
import DiceFour from "./assets/dice-4.png"
import DiceFive from "./assets/dice-5.png"
import DiceSix from "./assets/dice-6.png"

import ReactNativeHapticFeedback from "react-native-haptic-feedback";

// Optional configuration
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};


// props passing to dice component (type declaration)
type DiceProps = PropsWithChildren<{
  // type provided by react native for images
  imageUrl : ImageSourcePropType
}>

// dice component
const Dice = ({imageUrl}:DiceProps) : JSX.Element => {
  return (
    <View>
      <Image style={styles.diceImage} source={imageUrl}/>
    </View>
  )
}

export default function App() {
  // type for image 
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne);

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    ReactNativeHapticFeedback.trigger("notificationSuccess", options);
    switch(randomNumber){
      case 1 : return setDiceImage(DiceOne);
      case 2 : return setDiceImage(DiceTwo);
      case 3 : return setDiceImage(DiceThree);
      case 4 : return setDiceImage(DiceFour);
      case 5 : return setDiceImage(DiceFive);
      case 6 : return setDiceImage(DiceSix);
    }

  }
  return (
    <View style={styles.container}>
        <Dice imageUrl={diceImage}/>
        <Pressable onPress={rollDice}>
          <Text style={styles.btn}>Roll Dice</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"violet"
  },

  diceImage:{
    width : 200,
    height : 200,
  },

  btn:{
    fontSize : 24,
    fontWeight : 'bold',
    marginTop : 20,
    color : "white",
    borderRadius : 8,
    borderColor : "white"
  }
})