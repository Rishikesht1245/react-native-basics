import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ControlCenter() {
  
  // Getting the playback state from the TrackPlayer
  const {state : playbackState} = usePlaybackState();

  // Next button
  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.error('Error skipping to next track:', error);
    }
  };

  // Previous button
  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
      console.error('Error skipping to previous track:', error);
    }
  };

  // Toggle between play and pause
  const togglePlayer = async (playback : any) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    
    // Ensure there's a valid current track before attempting to play or pause
    if (currentTrack !== null) {
      console.log("playing", playback, State.Ready)
      if (playback === State.Paused || playback === State.Ready) {
        console.log("Playing")
        await TrackPlayer.play();
      } else if (playback === State.Playing) {
        await TrackPlayer.pause();
      }
    }
  };

  const isPlaying = (state: any): boolean => {
    return state === State.Playing;
  };

  return (
    <View style={styles.container}>
      {/* Previous Button */}
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>

      {/* Play/Pause Button */}
      <Pressable onPress={() => togglePlayer(playbackState as unknown as State)}>
        <Icon
          style={styles.icon}
          name={isPlaying(playbackState) ? 'pause' : 'play-arrow'}
          size={75}
        />
      </Pressable>

      {/* Next Button */}
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    color: '#CCCCCC',
  },
});
