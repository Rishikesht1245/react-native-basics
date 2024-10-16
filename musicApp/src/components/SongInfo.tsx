import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Track} from 'react-native-track-player';

type SongInfoProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;

const SongInfo = ({track}: SongInfoProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style ={styles.name}>
            {track?.title}
        </Text>
        <Text style ={styles.artist}>
            {track?.artist}   .   {track?.album}
        </Text>
      </View>
    </View>
  );
};

export default SongInfo;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    margin : "auto",
    flex: 1,
    marginTop : 20
  },
  name : {
    fontSize : 18,
    fontWeight : "600",
    color : "#FFF"
  },
  artist : {
    fontSize : 18,
    fontWeight : '500',
    color : "#ccc"
  }
});
