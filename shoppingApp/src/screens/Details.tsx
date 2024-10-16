import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type DetailsProps = NativeStackScreenProps<RootStackParamList,'Details'>

const Details = ({navigation, route} : DetailsProps) => {

  const {product} = route.params;

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image style={styles.image} source={{uri : product.imageUrl}}/>
      </View>

      <View>
        <Text style={styles.name}>{product.name}</Text>
        {/* Rating container */}
        <View style={[styles.rowContainer, styles.ratingContainer]}>
          <View>
            <Text>{product.rating}⭐</Text>
          </View>
          <Text style={styles.ratingText}>
            {product.ratingCount.toLocaleString()}
          </Text>
        </View>
        {/* Price Container */}
        <View style={[styles.rowContainer, styles.priceContainer]}>
          <Text style={styles.originalPrice}>
            {product.originalPrice.toLocaleString()}
          </Text>
          <Text style={styles.discountPrice}>
            {product.discoundPrice.toLocaleString()}
          </Text>
          <Text style={styles.offerPercentage}>
            {product.offerPercentage.toLocaleString()}
          </Text>
        </View>
        {product?.tags?.map((tag, index) => (
          <View key={index}>
            <Text>
              {tag}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Details

const styles = StyleSheet.create({
  container: {
    flex : 1,
    margin: 8,
    flexDirection: 'row',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 90,
    height: 150,
  },
  name: {
    marginBottom: 4,
    fontSize: 15,
    fontWeight: 500,
  },
  offerPercentage: {
    fontSize: 12,
    fontWeight: 300,
  },
  discountPrice: {
    fontSize: 14,
    fontWeight: 300,
    color: 'green',
  },
  originalPrice: {
    fontSize: 12,
    fontWeight: 300,
    color: 'red',
    textDecorationLine: 'line-through',
  },
  rating: {
    borderRadius: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
    backgroundColor: '#008c00',
    marginRight: 4,
  },
  priceContainer: {
    marginBottom: 12,
  },
  ratingContainer: {
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 300,
    color: '#FFFFFF',
    backgroundColor: 'green',
    padding: 4,
  },
  badges : {
    backgroundColor : "#333",
    padding : 5,
    borderRadius : 5
  },
  badgeText : {
    color : "#FFFFFF",
    fontSize : 12,
    fontWeight : 300,
  }
});