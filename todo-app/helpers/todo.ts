import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUserDetails = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const uservalue = await AsyncStorage.getItem("user");
    const user = uservalue != null ? JSON.parse(uservalue) : null;

    return { token, user };
  };