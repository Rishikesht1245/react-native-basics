
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
            />
          </View>

          {resultValue && (
            <Text style={styles.resultText}>
              {resultValue}
            </Text>
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
    marginTop: 32,
    paddingHorizontal: 24,
  },
  topContianer: {},
  rupee: {},
  resultText: {},
  bottomContainer: {},
  rupeeContainer: {},
  button: {},
  selected: {},
});

export default App;
