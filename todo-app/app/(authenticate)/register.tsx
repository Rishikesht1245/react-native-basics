import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bg-img.jpeg")}
        style={styles.backgroundImage}
      >
        <View style={{ marginTop: 100 }}>
          <Text style={styles.heading}>To-Do List Tracker</Text>
        </View>
        <GestureHandlerRootView>
          <KeyboardAvoidingView>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.title}>Register to your account</Text>
            </View>

            {/* Inputs */}
            <View style={{ marginTop: 70, gap: 30, marginHorizontal: 10 }}>
            <View style={styles.inputContianer}>
                <MaterialIcons name="supervised-user-circle" size={28} color="grey" />
                <TextInput
                  placeholder="Enter your name"
                  style={styles.input}
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </View>
              <View style={styles.inputContianer}>
                <MaterialIcons name="email" size={28} color="grey" />
                <TextInput
                  placeholder="Enter your email"
                  style={styles.input}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View style={styles.inputContianer}>
                <FontAwesome name="lock" size={30} color="grey" />
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholder="Enter your password"
                  style={styles.input}
                  secureTextEntry={true}
                />
              </View>

              {/* Register Button */}
              <Pressable style={styles.btn}>
                <Text style={styles.btnTxt}>Register</Text>
              </Pressable>
              <Pressable onPress={() => router.replace("/login")}>
                <Text style={styles.title}>
                  Already have an account? Log in
                </Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </GestureHandlerRootView>
      </ImageBackground>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    alignItems : "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0066b2",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
    color: "#000",
  },
  inputContianer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#eee",
    shadowOffset :{
      width : 5,
      height : 5
    },
    borderWidth : 1,
    borderColor : "#bbb"
  },
  input: {
    color: "grey",
    width: 280,
    fontSize: 16,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    width: "100%",
    backgroundColor: "#6699CC",
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
  },
  btnTxt: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
