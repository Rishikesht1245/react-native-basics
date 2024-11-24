import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchUserDetails } from "@/helpers/todo";
import { API_URL } from "@/config";
import { LineChart } from "react-native-chart-kit";

const index = () => {
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [pendingCount, setPendingCount] = useState<number>(0);

  const fetchTodoStatistics = async () => {
    try {
      const { token, user } = await fetchUserDetails();
      const todo_url = `${API_URL}/todos/${user._id}/stats`;

      const response = await axios.get(todo_url, {
        headers: {
          auth_token: token,
        },
      });

      const { completedCount = 0, pendingCount = 0 } = response.data.statistics;
      console.log({ completedCount, pendingCount });

      setCompletedCount(completedCount);
      setPendingCount(pendingCount);
    } catch (error: any) {
      console.log("Error in fetching statistics :: ", error?.message);
    }
  };

  useEffect(() => {
    fetchTodoStatistics();
  }, []);

  return (
    <View style={styles.container}>
      {/* default profile image */}
      <View style={styles.wrapper}>
        <Image
          source={require("../../../assets/images/profile.png")}
          width={60}
          height={60}
        />

        <View>
          <Text style={styles.head1}>Keep Plans for 15 Days</Text>
          <Text style={styles.subHead}>Select Categories</Text>
        </View>
      </View>

      {/* Task Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.head1}>Task Overview</Text>
        <View style={styles.detailsSubContainer}>
          <View style={styles.detailsItem}>
            <Text style={styles.head1}>{completedCount}</Text>
            <Text style={styles.subHead2}>Completed Tasks</Text>
          </View>
          <View style={styles.detailsItem}>
            <Text style={styles.head1}>{pendingCount}</Text>
            <Text style={styles.subHead2}>Pending Tasks</Text>
          </View>
        </View>
      </View>

      {/* Line Chars */}
      <LineChart
        data={{
          labels: ["Pending Tasks", "Completed Tasks"],
          datasets: [{ data: [pendingCount, completedCount] }],
        }}
        width={Dimensions.get("window").width}
        height={280}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={2}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />

    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  head1: {
    fontSize: 16,
    fontWeight: "600",
  },
  subHead: {
    fontSize: 15,
    color: "gray",
    marginTop: 3,
  },

  subHead2: {
    fontSize: 15,
    color: "#555",
  },

  detailsContainer: {
    marginVertical: 15,
  },

  detailsSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginVertical: 10,
  },

  detailsItem: {
    backgroundColor: "#89cff0",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  nextItems : {
    backgroundColor: "#89cff0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    marginVertical : 20
  }
});
