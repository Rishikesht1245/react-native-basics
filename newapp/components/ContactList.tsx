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
      <View style={styles.container}>
        {
            contacts?.map(({name, number, status, imageUrl}) => (
                <View key={name} style={styles.userCard}>
                    <Image style={styles.userImg} source={{uri : imageUrl}}/>
                    <View>

                    <Text style={styles.userName}>{name}</Text>
                    <Text style={styles.userStatus}>{status}</Text>
                    </View>
                </View>
            ))
        }
      </View>
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
        marginVertical : 20,
        flex : 1
    },
    userCard : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems : "center",
        gap : 10,
        marginHorizontal :"auto",
        marginVertical : 3,
        borderRadius : 10,
        width : "90%",
        backgroundColor : "#8d3daf",
        padding : 8
    },
    userImg : {
        width : 60,
        height : 60,
        borderRadius : 30
    },
    userName:{
        fontSize : 16,
        fontWeight : "bold",
        color: "white"
    },
    userStatus: {
        fontSize : 14,
        fontWeight : "400",
        color : "white"
    }
})