import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';

import React, {useState, useEffect} from 'react'

import { setupPlayer, addTrack } from '../musicPlayerServices';

export default function App() {

  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  async function setUp(){
    // the setupPlayer function will be called inside the service
    // which will set up the player
    let isSetup = await setupPlayer();

    if(isSetup){
      // if is setup is true : add track to the player.
      await addTrack()
    }

    setIsPlayerReady(true)
  }

  // making player ready
  useEffect(() => {
    setUp()
  },[]);

  if(!isPlayerReady){
    return (
      <SafeAreaView>
        {/* buffering */}
        <ActivityIndicator/>
      </SafeAreaView>
    )
  }

  // if player is ready return this.
  return (
    <SafeAreaView>
      <StatusBar/>
      <Text>App</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    // takes the entire portion
    flex : 1
  }
})