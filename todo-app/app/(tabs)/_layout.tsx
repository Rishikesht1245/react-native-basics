import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Layout() {
  // the tabs to see on the bottom of every screen
  return (
    <Tabs>
      <Tabs.Screen
        //   this is the name we have given to the file tree
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#7CB9E8", fontSize:14, padding:1},
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="tasks" size={24} color="#7CB9E8" />
            ) : (
              <FontAwesome name="tasks" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        //   this is the name we have given to the file tree
        name="calendar"
        options={{
          tabBarLabel: "Calendar",
          tabBarLabelStyle: { color: "#7CB9E8", fontSize:14, padding:1},
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="calendar" size={24} color="#7CB9E8" />
            ) : (
              <AntDesign name="calendar" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        //   this is the name we have given to the file tree
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#7CB9E8", fontSize:14, padding:1 },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="face-man-profile"
                size={24}
                color="#7CB9E8"
              />
            ) : (
              <MaterialCommunityIcons
                name="face-man-profile"
                size={24}
                color="black"
              />
            ),
        }}
      />
    </Tabs>
  );
}
