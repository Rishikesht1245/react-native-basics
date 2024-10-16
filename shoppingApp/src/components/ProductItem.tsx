import {Image, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

type ProductProps = PropsWithChildren<{
  product: Product;
}>;

const ProductItem = ({product}: ProductProps) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: product?.imageUrl}} style={styles.image} />

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
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
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
});
