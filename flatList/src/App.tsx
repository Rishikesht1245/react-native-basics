
import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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

  const buttonPressed = (targetValue: Currency) => {
    if (!targetValue) {
      return Snackbar.show({
        text: "Enter a value to convert",
        backgroundColor: "#EA7773",
        textColor: "#000000"
      })
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)} 😊`;

      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      return Snackbar.show(
        {
          text: "Not a valid number to convert",
          backgroundColor: "#EA7773",
          textColor: "#000000"
        }
      )
    }
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.sectionContainer}>
        <View style={styles.topContianer}>
          <View style={styles.rupeeContainer}>
            <Text style={styles.rupee}>Rs</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              // clear the input once entered : IOS
              clearButtonMode='always'
              onChangeText={setInputValue}
              keyboardType='number-pad'
              placeholder='Enter amount in Rupees'
              style ={styles.input}
            />
          </View>

          {resultValue && (
            <View style={styles.rupeeContainer}>
             <Text style={styles.rupee}>Result Value</Text>
            <Text style={styles.resultText}>
              {resultValue}
            </Text>
            </View>
          )}
        </View>

        <View style={styles.bottomContainer}>
          {/* Flat list cam here */}
          <FlatList
            // number of columns
            numColumns={3}
            // the array that the flat list needs to go through
            data={currencies}
            // the key that the flat list need to take data : Unique
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              // button
              <Pressable style={[styles.button, targetCurrency === item.name && styles.selected]} onPress={() => buttonPressed(item)}>
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    margin : 10,
    display : "flex",
    justifyContent : "center",
    paddingHorizontal: 24,
    backgroundColor : "rgba(0,0,0,0.2)",
    height : 'auto'
  },
  topContianer: {
    display : "flex",
    flexDirection : 'row',
    marginTop : 20,
    gap : 10,
    padding : 20,
    backgroundColor : "rgba(0,0,0,0.3)"
  },
  rupee: {
    display : 'flex',
    flexDirection :'row'
  },
  input:{
    backgroundColor: "#FFFFFF",
    borderRadius : 5,
    paddingVertical : 0
  },
  resultText: {
    padding : 4,
    backgroundColor: "#FFFFFF",
    borderRadius : 5,
  },
  bottomContainer: {
    display : 'flex',
    flexDirection :'row',
    gap : 20,
    marginTop : 30
  },
  button: {
    backgroundColor :'#FFFFFF',
    width : 90,
    height : 90,
    margin : 10
  },
  selected: {
    backgroundColor : 'rgba(0,0,0,0.4)'
  },
  rupeeContainer:{}
});

export default App;
