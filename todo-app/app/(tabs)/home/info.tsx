import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Href, useLocalSearchParams, useRouter } from "expo-router";

const info = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={() => router.push("/home" as Href)}/>
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </View>

      <View style={styles.rowContainer}>
        <View style={styles?.rowItem1}>
          <MaterialIcons name="category" size={24} color="black" />
          <Text style={styles.category}>Category</Text>
        </View>
        <View style={styles.rowItem2}>
          <Text style={styles.category}>
            {(params?.category as string)?.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles?.rowItem1}>
        <FontAwesome5 name="tasks" size={24} color="black" />
          <Text style={styles.category}>Todo </Text>
        </View>
        <View style={styles.rowItem2}>
          <Text style={styles.category}>
            {(params?.title as string)?.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles?.rowItem1}>
        <AntDesign name="calendar" size={24} color="black" />
          <Text style={styles.category}>Created Date </Text>
        </View>
        <View style={styles.rowItem2}>
          <Text style={styles.category}>
            {new Date(params.createdAt as string).toDateString()}
          </Text>
        </View>
      </View>


    </View>
  );
};

export default info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    paddingVertical: 10,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  category: {
    fontWeight: "500",
    fontSize: 14,
  },
  title: {
    fontWeight: "600",
    fontSize: 17,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },

  rowItem1: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  rowItem2: {
    padding: 7,
    backgroundColor: "#eee",
    borderRadius : 8,
  },
});
