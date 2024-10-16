import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import {playListData} from '../constants';
import ControlCenter from '../components/ControlCenter';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/Slider';
// accessing the width of the device
const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>(null);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
        setTrack(playingTrack as Track);
        break;
    }
  });

  const renderArtWork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork && (
            <Image style={styles.albumImage} source={track?.artwork as ImageSourcePropType} />
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>
            Music App
        </Text>
      <FlatList
        horizontal
        data={playListData}
        renderItem={renderArtWork}
        keyExtractor={song => song.id.toString()}
      />
      <SongInfo track={track} />
      <SongSlider/>
      <ControlCenter />
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    // display : "flex",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f1f1fa9',
  },
  heading:{
    // textAlign : "left",
    alignSelf : "flex-start",
    margin : 10,
    fontSize : 24,
    fontWeight : '500',
    textTransform : "uppercase",
    color : "#FFF"
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 350,
    height: 400,
  },
  albumImage: {
    width: 350,
    height: 450,
  },
});
