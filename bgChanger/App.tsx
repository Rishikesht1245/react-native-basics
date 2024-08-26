

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

  const generateColor = () => {
    // hex values range
    const hexRange = "0123456789ABCDEF";

    let color = "#";

    for(let i = 0; i < 6; i++){
      const random = Math.floor(Math.random() * 16);
      color += hexRange[random];
    }

    setRandomBackground(color);
  }

  return (
    <>
    {/* Status bar which shows the time network details on mobile screen */}
      <StatusBar backgroundColor={randomBackground} />
      <View style={[styles.container, {backgroundColor : randomBackground}]}>
        <TouchableOpacity onPress={generateColor}>
          <View style={styles.actionBtn}>
            <Text style={styles.btnTxt}>Press me</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
container : {
  flex : 1,
  alignItems : "center",
  justifyContent : "center"
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
}
});

export default App;
