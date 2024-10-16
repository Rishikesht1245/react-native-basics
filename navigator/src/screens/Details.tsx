import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

// navigations
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {useNavigation} from '@react-navigation/native';

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

// passed data will be in route object
const Details = ({route}: DetailsProps) => {
  // parameters
  const {productId} = route.params;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.smallText}>Details of Product : {productId}</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
        // onPress={() => navigation.goBack()}
        // onPress={() => navigation.pop(1)}
        // onPress={() => navigation.popToTop()}
      />
      <Button
        title="Go to First Screen"
        // onPress={() => navigation.navigate('Home')}
        // onPress={() => navigation.goBack()}
        // onPress={() => navigation.pop(1)}
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: {
    color: '#000000',
  },
});
