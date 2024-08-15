import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FlatCard() {
  return (
    <View>
      <Text style={styles?.headingText}>FlatCard</Text>
      <View style={styles?.container}>
        <View style={[styles.card, styles.cardRed]}>
            <Text>Red</Text>
        </View>
        <View style={[styles.card, styles.cardGreen]}>
            <Text>Green</Text>
        </View>
        <View style={[styles.card, styles.cardYellow]}>
            <Text>Yellow</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    headingText : {
        fontSize : 24,
        fontWeight : "bold",
        paddingHorizontal : 10,
    },
    container:{
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-between",
        padding : 8

    },
    card:{
        width: 100,
        height : 100,
        borderRadius : 4,
        margin : 8,
        flex : 1,
        justifyContent : "center",
        alignItems : "center"

    },
    cardRed : {
        backgroundColor : "red"
    },
    cardGreen:{
        backgroundColor : "green"
    },
    cardYellow:{
        backgroundColor : "yellow"
    }
})