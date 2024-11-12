import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useMemo } from "react";
const index = () => {
  const todos = useMemo(() => [], []);
  return (
    <>
      {/* Buttons : filter and add */}
      <View style={styles.container}>
        <Pressable style={[styles.btn, styles.bg_blue]}>
          <Text style={styles.text}>All</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.bg_red]}>
          <Text style={styles.text}>Work</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.bg_green, { marginRight: "auto" }]}
        >
          <Text style={styles.text}>Personal</Text>
        </Pressable>
        {/* add button */}
        <Pressable style={[styles.btn]}>
          <AntDesign name="pluscircle" size={32} color="#007FFF" />
        </Pressable>
      </View>

      {/* Scroll View : Todo Scrolling */}
      <GestureHandlerRootView>
        <ScrollView style={styles.todo_container}>
          {todos?.length > 0 ? (
            <View>Todos</View>
          ) : (
            // Add todo
            <View style={styles.todo_add}>
              <Image
                style={styles.todo_img}
                source={require("../../../assets/images/todo_icon.webp")}
              />
              <Text
                style={[styles.text_black, { marginTop: 15, fontSize: 16 }]}
              >
                No Tasks for today! add a task
              </Text>
              <Pressable style={[styles.btn]}>
                <AntDesign name="pluscircle" size={40} color="#007FFF" />
              </Pressable>
            </View>
          )}
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  bg_blue: {
    backgroundColor: "#7CB9E8",
  },

  bg_red: {
    backgroundColor: "#e67e22",
  },

  bg_green: {
    backgroundColor: "#1abc9c",
  },

  text: {
    color: "white",
    textAlign: "center",
  },

  text_black: {
    textAlign: "center",
    fontWeight: "600",
  },

  todo_container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  todo_add: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 130,
    gap: 8,
  },

  todo_img: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});
