import { StyleSheet, Text, View, Linking, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ActionCard() {

    function openWebsite(websiteLink: string) {
        Linking.openURL(websiteLink);
    }

    return (
        <View>
            <Text style={styles.headingText}>Blog Card</Text>
            <View style={[styles.card, styles.elevated]}>
               <View style={styles.headerContainer}>
                     <Text style={styles.headerText}>What's new in JavaScript 2021</Text>
               </View>
               <Image style={styles.cardImg} source={{uri: "https://picsum.photos/200"}}/>
               <View style ={styles.cardBodyContainer}>
                {/* numberofLines is used to wrap the text with in the give number of lines */}
                    <Text numberOfLines={3}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore amet aspernatur quidem accusantium consectetur eius neque minus vel sint unde! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident doloribus suscipit, expedita magni mollitia aliquid voluptatum. Maxime, repudiandae perspiciatis in cum eum qui similique iusto quasi. Illum sint omnis ducimus.
                    </Text>
               </View>
               <View style ={styles.footerContainer}>
                   <TouchableOpacity onPress={() => openWebsite("https://www.google.com")}>
                    <Text>Read More</Text>
                   </TouchableOpacity>
               </View>
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
    container: {
        padding: 8,

    },
    card:{
        marginHorizontal : 20,
        marginVertical : 20,
        padding : 10,
        backgroundColor : "white",
        borderRadius : 8
    },
    elevated : {
        elevation : 3
    },
    headerContainer:{
        padding : 6,
        marginBottom : 10
    },
    headerText:{},
    cardImg:{
        height : 100
    },
    cardBodyContainer:{
        marginVertical : 10,
    },
    footerContainer: {
        color : "blue",
        marginTop : 10,
    }
})