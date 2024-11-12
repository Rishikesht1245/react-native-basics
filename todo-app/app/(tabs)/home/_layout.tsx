import { Stack } from "expo-router";


export default function Layout() {
  return (
    // This will display the name as header
  <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name="index"/>
  </Stack>
  )
}

