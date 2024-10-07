import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// react navigation

import ProductItem from '../components/ProductItem';
import Separator from '../components/Separator';

import { products } from '../data/constants';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation} : HomeProps) => {

  return (
    <View style={styles.container}>
      <FlatList
       data={products}
       keyExtractor={(product) => product.id}
       ItemSeparatorComponent={Separator}
       renderItem={({item}) => (
        <Pressable onPress={() => {
          navigation.navigate("Details", {
            product: item
          })
        }}>
          <ProductItem product={item}/>
        </Pressable>
       )}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container :{
    flex : 1,
    alignItems : "flex-start",
    justifyContent : "center",
    padding : 12,
    backgroundColor : "#FFFFFF"
  }
});