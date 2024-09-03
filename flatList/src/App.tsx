
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// constants
import { currencies } from './constants';
// Component
import CurrencyButton from './components/CurrencyButton';
// used for showing notifications
import Snackbar from 'react-native-snackbar';


function App(): React.JSX.Element {

  const [inputValue, setInputValue] = useState<string>("");
  const [resultValue, setResultValue] = useState<string>("");
  const [targetCurrency, setTargetCurrency] = useState<string>("");

  const buttonPressed = (targetValue : Currency) => {
    if(!targetValue){
      return Snackbar.show({
        text : "Enter a value to convert",
        backgroundColor : "#EA7773",
        textColor : "#000000"
      })
    }

    const inputAmount = parseFloat(inputValue);
    if(!isNaN(inputAmount)){
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)} 😊`;

      setResultValue(result);
      setTargetCurrency(targetValue.name);
    }else {
      return Snackbar.show(
        {
          text : "Not a valid number to convert",
          backgroundColor : "#EA7773",
          textColor : "#000000"
        }
      )
    }
  }

  return (
    <SafeAreaView>
      <StatusBar/>
     <View>
      <Text>App</Text>
     </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
