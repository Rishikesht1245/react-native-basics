import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ElevatedCard() {
  return (
    <View>
      <Text style={styles.headingText}>Elevated Card</Text>
      {/* Creating horizontal scroll view */}
      <ScrollView horizontal={true} style={styles.container}>

        <View style={[styles.card, styles.elevated]}>
            <Text>Tap</Text>
        </View>
        <View style={[styles.card, styles.elevated]}>
            <Text>me</Text>
        </View>
        <View style={[styles.card, styles.elevated]}>
            <Text>to</Text>
        </View>
        <View style={[styles.card, styles.elevated]}>
            <Text>scroll</Text>
        </View>
        <View style={[styles.card, styles.elevated]}>
            <Text>more...</Text>
        </View>
        <View style={[styles.card, styles.elevated]}>
            <Text>😊😊😊</Text>
        </View>
      </ScrollView>
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
       padding: 8

    },
    card : {
        width : 100,
        height : 100,
        borderRadius : 4,
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        margin : 8,
    },
    elevated : {
        backgroundColor: "teal",
        elevation : 4,
        shadowOffset: {
            width : 3,
            height :3,
        },
        shadowColor : "red",
        shadowOpacity : 1,
        shadowRadius : 2
    }
})