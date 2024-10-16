import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'

import {  NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../routes/AuthStack';

// context 
import { appWriteContext } from '../appwrite/appwriteContext';
import Snackbar from 'react-native-snackbar';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>

const Login = ({navigation} : LoginScreenProps) => {

  const {appwrite, setIsLoggedIn} = useContext(appWriteContext);

  const [error, setError] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")


  // login function using appwrite create email password session
  const handleLogin = () => {
    if(email?.length < 1 || password?.length < 1){
      setError("All fields are required.");
    }else {
      const loginUser = {
        email, password
      }
      appwrite
      .login(loginUser)
      .then((response) => {
        if(response){
          setIsLoggedIn(true);
          Snackbar.show({
            text : "Login Successful",
            duration : Snackbar.LENGTH_LONG
          })
        }
      })
      .catch(e => {
        console.log("Error in login :: ", e?.message);
        setEmail("Incorrect email or password")
      })
    }
  }
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
    <View style={styles.formContainer}>
      <Text style={styles.appName}>Appwrite Auth</Text>



      {/* Email */}
      <TextInput
        value={email}
        keyboardType="email-address"
        onChangeText={text => {
          setError('');
          setEmail(text);
        }}
        placeholderTextColor={'#AEAEAE'}
        placeholder="Email"
        style={styles.input}
      />

      {/* Password */}
      <TextInput
        value={password}
        onChangeText={text => {
          setError('');
          setPassword(text);
        }}
        placeholderTextColor={'#AEAEAE'}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      {/* Validation error */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Signup button */}
      <Pressable
        onPress={handleLogin}
        style={[styles.btn, {marginTop: error ? 10 : 20}]}>
        <Text style={styles.btnText}>Login</Text>
      </Pressable>

      {/* Login navigation */}
      <Pressable
        onPress={() => navigation.navigate('SignUp')}
        style={styles.loginContainer}>
        <Text style={styles.haveAccountLabel}>
          Don't have an account?{'  '}
          <Text style={styles.loginLabel}>Signup</Text>
        </Text>
      </Pressable>
    </View>
  </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    color: '#f02e65',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fef8fa',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,

    width: '80%',
    color: '#000000',

    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginLabel: {
    color: '#1d9bf0',
  },
});
