import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { API_URL } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ITodo } from "@/interfaces";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const index = () => {
  const today = new Date().toLocaleDateString("en-CA");
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [todos, setTodos] = useState([]);

  const fetchUserDetails = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const uservalue = await AsyncStorage.getItem("user");
    const user = uservalue != null ? JSON.parse(uservalue) : null;

    return { token, user };
  };

  const getUserTods = async () => {
    try {
      const { token, user } = await fetchUserDetails();
      const todo_url = `${API_URL}/todos/${user._id}?date=${selectedDate}&status=completed`;
      const response = await axios.get(todo_url, {
        headers: {
          auth_token: token,
        },
      });

      if (response.status === 200) {
        const completedTodos = response.data.todos;
        console.log({ completedTodos });
        setTodos(completedTodos);
      }
    } catch (error: any) {
      console.log("Error in fetching todos :: ", error);
      Alert.alert(
        "Failed to fetch todos",
        error?.message || "Something went wrong."
      );
    }
  };

  useEffect(() => {
    getUserTods();
  }, [selectedDate]);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };
  return (
    <GestureHandlerRootView>
      <ScrollView style={styles.container}>
        <Calendar initialDate={selectedDate} onDayPress={handleDayPress} />
        <View style={{ marginTop: 20 }}>
          {todos?.length > 0 && (
            <View style={{margin : 10}}>
              <View style={styles.completedItem}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png",
                  }}
                />
              </View>
              <View style={styles.todoItem}>
                <Text style={styles.todoText}>Completed Tasks</Text>
                <MaterialIcons name="arrow-drop-down" size={24} color="black" />
              </View>

              {todos?.map((todo: ITodo) => (
                <Pressable key={todo?._id} style={styles.todoButton}>
                  <View style={styles.todoItem}>
                    <FontAwesome name="circle" size={18} color="green" />
                    <Text style={styles.completedText}>{todo?.title}</Text>
                    <Feather name="flag" size={20} color="grey" />
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  todoButton: {
    padding: 10,
    borderRadius: 7,
    backgroundColor: "#eef4ff",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 5,
    fontWeight: "600",
  },

  completedItem: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  completedText: {
    flex: 1,
    textDecorationLine: "line-through",
    color: "grey",
    fontSize: 18,
  },
});
