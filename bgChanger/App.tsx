

import React, { useState } from 'react';
import {

  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';







function App(): React.JSX.Element {

  const [randomBackground, setRandomBackground] = useState("#ffffff");
  const [squareBackground, setSquareBackground] = useState("#ffffff");
  const [circleBackground, setCircleBackground] = useState("#ffffff");
  const [triBackground, setTriBackground] = useState("#ffffff");

  const generateColor = () => {
    // hex values range
    const hexRange = "0123456789ABCDEF";

    let color = "#";

    for(let i = 0; i < 6; i++){
      const random = Math.floor(Math.random() * 16);
      color += hexRange[random];
    }

    return color;
  }

  const handleColors = () => {
   setRandomBackground(generateColor());
   setCircleBackground(generateColor());
   setSquareBackground(generateColor());
   setTriBackground(generateColor())
  }

  return (
    <>
    {/* Status bar which shows the time network details on mobile screen */}
      <StatusBar backgroundColor={randomBackground} />
      <View style={[styles.container, {backgroundColor : randomBackground}]}>
        {/* Reactangle and circle */}
        <View style={[styles.rowContainer]}>
          {/* rectangle */}
          <View style={[styles.rectangle, {backgroundColor : squareBackground}]}/>
          {/* circle */}
            <View style={[styles.circle, {backgroundColor : circleBackground}]}/>
        </View>
        
        <TouchableOpacity onPress={handleColors}>
          <View style={styles.actionBtn}>
            <Text style={styles.btnTxt}>Press me</Text>
          </View>
        </TouchableOpacity>

        {/* Triangle */}
        <View style ={[styles.triangle, {borderBottomColor : triBackground}]}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
container : {
  // flex 1 will takes the whole available space, display : flex won't take it.
  flex : 1,
  alignItems : "center",
  justifyContent : "center",
  gap :20,
  maxHeight : "100%"
},
rowContainer:{
  display :"flex",
  flexDirection : "row",
  alignItems : "center",
  gap : 20
},
actionBtn: {
  borderRadius : 12,
  backgroundColor : "#6A1B4D",
  paddingVertical : 10,
  paddingHorizontal : 40
},
btnTxt : {
  fontSize : 24,
  color : "white",
  textTransform : "uppercase",
},
rectangle : {
  width : 100,
  height : 100
},
circle : {
  width : 100,
  height : 100,
  borderRadius : 50
},
triangle: {
  width: 0,
  height: 0,
  borderLeftWidth: 100,
  borderRightWidth: 100,
  borderBottomWidth: 100,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
},
});

export default App;
