import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ContactList() {
    const contacts = [
        {
            name : "rishi",
            number : "1234",
            status :"Making your gpay smooth",
            imageUrl : "https://picsum.photos/200"
        },
        {
            name : "Vasu",
            number : "1234",
             status :"Making your gpay smooth",
            imageUrl : "https://picsum.photos/200"
        },
        {
            name : "Abhi",
            number : "1234",
             status :"Making your gpay smooth",
            imageUrl : "https://picsum.photos/200"
        },
        {
            name : "Vishnu",
            number : "1234",
             status :"Making your gpay smooth",
            imageUrl : "https://picsum.photos/200"
        },
    ]
  return (
    <View>
      <Text style ={styles.headingText}>ContactList</Text>
      <ScrollView style={styles.container} horizontal={true}>
        {
            contacts?.map(({name, number, status, imageUrl}) => (
                <View key={name} style={styles.userCard}>
                    <Image style={styles.userImg} source={{uri : imageUrl}}/>
                    <Text style={styles.userName}>{name}</Text>
                    <Text style={styles.userStatus}>{status}</Text>
                </View>
            ))
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: "bold",
        paddingHorizontal: 10,
    },
    container : {
        display : "flex",
        flexDirection : "row",
        marginVertical : 20,
    },
    userCard : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        marginRight : 10,
        borderRadius : 10,
        width : "100%",
        backgroundColor : "white",
        padding : 8
    },
    userImg : {
        width : 60,
        height : 60,
        borderRadius : 30
    },
    userName:{
        fontSize : 16,
        fontWeight : "bold"
    },
    userStatus: {
        fontSize : 14,
        fontWeight : "400"
    }
})