import {
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

const login = () => {
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false);

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 100 }}>
        <Text style={styles.heading}>To-Do List Tracker</Text>
      </View>
      <GestureHandlerRootView>
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>Log in to your account</Text>
          </View>

          {/* Inputs */}
          <View style={{ marginTop: 70, gap: 30, marginHorizontal: 10 }}>
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

            {/* keep me logged in and forgot password */}
            <View style={styles.forgotPasswordContainer}>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Checkbox
                  color="#007FFF"
                  value={keepLoggedIn}
                  onValueChange={setKeepLoggedIn}
                />
                <Text style={{ fontWeight: "500", color: "gray" }}>
                  Keep me logged in
                </Text>
              </View>
              <Text style={{ color: "#66c", fontWeight: "500" }}>
                Forgot Password ?
              </Text>
            </View>

            {/* Login Button */}
            <Pressable style={styles.btn}>
              <Text style={styles.btnTxt}>Login</Text>
            </Pressable>
            <Pressable onPress={() => router.replace("/register")}>
              <Text style={styles.title}>Don't have an account? Sing up</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0066b2",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
    color: "#66c",
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
