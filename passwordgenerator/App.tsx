
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

// Form Validation
import * as Yup from "yup";
import { Formik } from 'formik';
import BouncyCheckbox from "react-native-bouncy-checkbox"

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .required()
    .min(4, "Should be min of 4 characters")
    .max(16, "Should be max of 16 characters"),
})

export default function App() {

  // variable and method to update this value.
  const [password, setPassword] = useState("");

  const [isPassGenerated, setIsPasswordGenerated] = useState(false);
  const [upperCase, setUppserCase] = useState(false)
  const [lowerCase, setLowerCase] = useState(true)
  const [symbols, useSymbols] = useState(true)
  const [numbers, useNumbers] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    // create the logic to generate password
    let characterList = "";

    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const digitChars = '1234567890';
    const specialChars = '!@#$%^&*()_+'

    // combines the above strings conditionally according to the requirement
    if (upperCase) {
      characterList += upperCaseChars
    }

    if (lowerCase) {
      characterList += lowerCaseChars
    }

    if (numbers) {
      characterList += digitChars
    }

    if (symbols) {
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setIsPasswordGenerated(true)

  }


  // return characters (based on uppercase lowercase)
  const createPassword = (characters: string, passwordLength: number) => {
    // creating the password
    let result = "";

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      // taking individual character from the string
      result += characters.charAt(characterIndex);
    }

    return result;
  }


  const resetPassword = () => {
    // resetting the state of the password
    setPassword("");
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setUppserCase(false);
    useNumbers(false);
    useSymbols(false)
  }

  return (
    // for handling keyboard tapping
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.header}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={passwordSchema}
            onSubmit={({ passwordLength }, { setSubmitting }) => {
              console.log({ passwordLength });
              generatePasswordString(+passwordLength)
            }}
          >
            {({ errors, touched, isValid, handleChange, handleSubmit, handleReset, values }) => {
              return (
                <>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputColumn}>
                      <Text style={styles.header}>Password Length</Text>
                      {/* Error messages */}
                      {touched?.passwordLength && errors?.passwordLength && (
                        <Text style={{ color: "red" }}>
                          {errors.passwordLength}
                        </Text>
                      )}

                      {/* OnChnageText is used for handling text changes */}
                      {/* Instead of name in HTML (we need to pass the name to handleChange function) */}
                      <TextInput
                        style={styles.inputStyle}
                        value={values?.passwordLength}
                        onChangeText={handleChange('passwordLength')}
                        placeholder='Ex .8'
                        keyboardType='numeric' />
                    </View>
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.header}>
                      Include Lowercase
                    </Text>
                    <BouncyCheckbox isChecked={lowerCase} onPress={() => setLowerCase(!lowerCase)} fillColor='blue' />
                  </View>
                  <View style={styles.inputWrapper}>
                    <BouncyCheckbox isChecked={upperCase} onPress={() => setUppserCase(!upperCase)} fillColor='blue' />
                  </View>
                  <View style={styles.inputWrapper}>
                    <BouncyCheckbox isChecked={symbols} onPress={() => useSymbols(!symbols)} fillColor='blue' />
                  </View>
                  <View style={styles.inputWrapper}>
                    <BouncyCheckbox isChecked={numbers} onPress={() => useNumbers(!numbers)} fillColor='blue' />
                  </View>

                  <View style={styles.formActions}>
                    <TouchableOpacity disabled={!isValid} style={{backgroundColor : "blue"}} onPress={()=> handleSubmit}>
                      <Text>Generate Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryBtn} onPress={() => {
                      handleReset();
                      resetPassword()
                    }}><Text>Reset Password</Text></TouchableOpacity>
                  </View>
                </>
              );
            }}
          </Formik>

      
        </View>
        {isPassGenerated ? (
            <View style={[styles?.card, styles?.cardElevated]}>
              <Text style={styles.title}>Result</Text>
              <Text style={styles.description}>Long Press to copy</Text>
              {/* long press to copy or share */}
              <Text selectable style={styles.generatedPassword}>{password}</Text>
            </View>
          ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  formContainer: {
    padding: 10,
    flex: 1,
  },
  header: {
    fontSize: 12,
    fontWeight: "bold"
  },
  inputWrapper: {
    width: "100%"
  },
  formActions: {
    flex: 1,
    flexDirection: 'row'
  },
  inputColumn: {
    flex: 1,
    flexDirection: "row",
    padding: 3,
    backgroundColor: 'white'
  },
  inputStyle: {
    color: "d33"
  },
  primaryButton:{
    color : "blue"
  },
  secondaryBtn:{

    backgroundColor : "grey",
    color : "white"
  },
  card : {

  },
  title :{},
  cardElevated : {},
  description : {},
  generatedPassword:{}
})