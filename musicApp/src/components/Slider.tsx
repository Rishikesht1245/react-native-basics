import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// this hook provides all the features we need to work with the progress of the track
import {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';

// track slider component for playing the music
const SongSlider = () => {
  //current duration and total duration
  const {position, duration} = useProgress();

  return (
    <View>
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor="#FFF"
        maximumTrackTintColor="#FFF"
        style={styles.sliderContainer}>
      </Slider>
        <View style={styles.timeContainer}>
          {/* this will return the minute and second *1000 === milliseconds */}
          <Text style={styles.time}>
          {new Date(position * 1000).toISOString().substring(15, 19)}
          </Text>
          {/* remaining time */}
          <Text style={styles.time}>
          {new Date((duration - position) * 1000).toISOString().substring(15, 19)}
          </Text>
        </View>
    </View>
  );
};

export default SongSlider;

const styles = StyleSheet.create({
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    // backgroundColor : "#FFF"
  },
  timeContainer: {
    width: 350,
    display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
  },
  time : {
    color : "#FFF",
    fontWeight : "400"
  }
});
