import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useEffect, useMemo, useState } from "react";
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { ITodo } from "@/interfaces";

const index = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [todo, setTodo] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [todos, setTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState<boolean>(false);

  const today = new Date().toDateString();

  const fetchUserDetails = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const uservalue = await AsyncStorage.getItem("user");
    const user = uservalue != null ? JSON.parse(uservalue) : null;

    return { token, user };
  };

  const todoSuggestions = [
    {
      id: 1,
      title: "Go to Gym",
      category: "Personal",
      completed: false,
    },
    {
      id: 2,
      title: "Finish the React",
      category: "Work",
      completed: false,
    },
    {
      id: 3,
      title: "Read a book",
      category: "Personal",
      completed: true,
    },
    {
      id: 4,
      title: "Organize workspace",
      category: "Work",
      completed: false,
    },
    {
      id: 5,
      title: "Call Mom and Dad",
      category: "Personal",
      completed: false,
    },
    {
      id: 6,
      title: "Go to bed early",
      category: "Personal",
      completed: false,
    },
  ];

  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category,
      };

      const { token, user } = await fetchUserDetails();

      const response = await axios.post(
        `${API_URL}/todos/${user._id}`,
        todoData,
        {
          headers: {
            AUTH_TOKEN: token,
          },
        }
      );

      if (response.status !== 201) {
        Alert.alert(
          "Failed to add the todo",
          response?.data?.error || "Something went wrong"
        );
      }

      Alert.alert("Success", "Todo added successfully.");
      setModalOpen(false);
      setTodo("");
    } catch (error: any) {
      console.log("Error in adding TODO :: ", error);
      Alert.alert(
        "Failed to add the todo",
        error?.message || "Something went wrong"
      );
    }
  };

  const getUserTods = async () => {
    try {
      const { token, user } = await fetchUserDetails();
      const todo_url = `${API_URL}/todos/${user._id}`;
      const response = await axios.get(todo_url, {
        headers: {
          auth_token: token,
        },
      });

      if (response.status === 200) {
        setTodos(response?.data?.todos);

        const allTodos = response.data.todos;
        const pending = allTodos.filter(
          (todo: { title: string; status: string }) =>
            todo.status !== "completed"
        );
        const completed = allTodos.filter(
          (todo: { title: string; status: string }) => todo.status !== "pending"
        );
        setPendingTodos(pending);
        setCompletedTodos(completed);
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
  }, []);

  const handleCompleteTodo = async (todoId: string) => {
    const { token, user } = await fetchUserDetails();

    setMarked(true);
    const response = await axios.patch(
      `${API_URL}/todos/${user._id}/${todoId}`,
      "",
      {
        headers: {
          AUTH_TOKEN: token,
        },
      }
    );

    if (response?.status === 200) {
      Alert.alert("Todo Marked as completed");
    }
  };

  return (
    <>
      {/* Buttons : filter and add */}
      <GestureHandlerRootView>
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
            <AntDesign
              name="pluscircle"
              size={32}
              color="#007FFF"
              onPress={() => setModalOpen(!modalOpen)}
            />
          </Pressable>
        </View>

        {/* Scroll View : Todo Scrolling */}
        <ScrollView style={styles.todo_container}>
          {todos?.length > 0 ? (
            <View>
              {pendingTodos?.length > 0 && (
                <Text style={styles.todoHeading}>Tasks To Do {today}</Text>
              )}

              {pendingTodos?.map((todo: ITodo) => (
                <Pressable key={todo?._id} style={styles.todoButton}>
                  <View style={styles.todoItem}>
                    <Entypo name="circle" size={18} color="black" />
                    <Text style={styles.todoText}>{todo?.title}</Text>
                    <Feather name="flag" size={20} color="black" />
                  </View>
                </Pressable>
              ))}

              {completedTodos?.length > 0 && (
                <Text style={styles.todoHeading}>Completed Todos</Text>
              )}

              {completedTodos?.map((todo: ITodo) => (
                <Pressable key={todo?._id} style={styles.todoButton}>
                  <View style={styles.todoItem}>
                    <Entypo name="circle" size={18} color="black" />
                    <Text style={styles.todoText}>{todo?.title}</Text>
                    <Feather name="flag" size={20} color="black" />
                  </View>
                </Pressable>
              ))}
            </View>
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
                <AntDesign
                  onPress={() => setModalOpen(!modalOpen)}
                  name="pluscircle"
                  size={40}
                  color="#007FFF"
                />
              </Pressable>
            </View>
          )}
        </ScrollView>
        <BottomModal
          onHardwareBackPress={() => setModalOpen(!modalOpen)!}
          visible={modalOpen}
          swipeDirection={["up", "down"]}
          swipeThreshold={200}
          modalTitle={<ModalTitle title="Add a Todo" />}
          modalAnimation={
            new SlideAnimation({
              slideFrom: "bottom",
            })
          }
          onTouchOutside={() => setModalOpen(!modalOpen)}
        >
          <ModalContent style={styles.modalContent}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Enter your todo"
                onChangeText={(text) => setTodo(text)}
                style={styles.modalInput}
                value={todo}
              />
              <Ionicons
                name="send"
                size={24}
                color="#007FFF"
                onPress={() => addTodo()}
              />
            </View>
            <View>
              <Text>Choose Category</Text>
              <View style={styles.modalCatContainer}>
                <Pressable
                  style={[
                    styles.modalCategory,
                    category === "work" ? { backgroundColor: "#0fff00" } : {},
                  ]}
                  onPress={() => setCategory("work")}
                >
                  <Text style={styles.modalCatText}>Work</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.modalCategory,
                    category === "personal"
                      ? { backgroundColor: "#0fff00" }
                      : {},
                  ]}
                  onPress={() => setCategory("personal")}
                >
                  <Text style={styles.modalCatText}>Personal</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.modalCategory,
                    category === "wishlist"
                      ? { backgroundColor: "#0fff00" }
                      : {},
                  ]}
                  onPress={() => setCategory("wishlist")}
                >
                  <Text style={styles.modalCatText}>Wishlist</Text>
                </Pressable>
              </View>

              <Text>Some Suggestions</Text>
              <View style={styles.modalSuggestionsContainer}>
                {todoSuggestions?.map((suggestion) => (
                  <Pressable
                    style={styles.modalSuggestions}
                    key={suggestion.id}
                    onPress={() => setTodo(suggestion.title)}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {suggestion?.title}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </ModalContent>
        </BottomModal>
      </GestureHandlerRootView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
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

  modalContent: {
    width: "100%",
    height: 300,
  },
  modalView: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  modalInput: {
    flex: 1,
    padding: 10,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 5,
  },
  modalCatContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  modalCategory: {
    borderColor: "#E0E0E0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 5,
  },
  modalCatText: {
    fontSize: 14,
  },
  modalSuggestionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 15,
  },
  modalSuggestions: {
    backgroundColor: "#F0F8FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 25,
  },

  todoHeading: {
    margin: 15,
    fontSize: 16,
    fontWeight: 600,
  },

  todoButton: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 7,
    backgroundColor: "#E0E0E0",
  },

  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  todoText: {
    flex: 1,
  },
});
