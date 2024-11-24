import { Stack } from "expo-router";
import {ModalPortal} from "react-native-modals"

export default function Layout() {
  return (
    <>
      {/* // This will display the name as header */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home/info" />
      </Stack>
      <ModalPortal/>
    </>
  );
}
