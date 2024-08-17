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
                    <Text style={styles.bodyText} numberOfLines={3}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore amet aspernatur quidem accusantium consectetur eius neque minus vel sint unde! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident doloribus suscipit, expedita magni mollitia aliquid voluptatum. Maxime, repudiandae perspiciatis in cum eum qui similique iusto quasi. Illum sint omnis ducimus.
                    </Text>
               </View>
               <View style ={styles.footerContainer}>
                   <TouchableOpacity onPress={() => openWebsite("https://www.google.com")}>
                    <Text style={styles.socialLinks}>Read More</Text>
                    
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => openWebsite("https://www.google.com")}>
                   <Text style={styles.socialLinks}>Follow Me</Text>
                    
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
        width : 350,
        height : 360,
        marginVertical : 12,
        marginHorizontal : 16,
        backgroundColor : "orange",
        padding : 10,
        borderRadius : 8
    },
    elevated : {
        elevation : 3,
        shadowOffset : {
            width : 1,
            height : 1
        },
        shadowColor : "#333",
        shadowOpacity : 0.4
    },
    headerContainer:{
       height : 40,
       flexDirection : "row",
       justifyContent : "center",
       alignItems : "center"
    },
    headerText:{
        color : "#FFF",
        fontWeight :"500",
        fontSize : 16
    },
    cardImg:{
        height : "50%",
        borderTopRightRadius : 20,
        borderBottomLeftRadius : 20
    },
    cardBodyContainer:{
        padding : 10,
        color : "#FFF"
    },
    bodyText:{
        color :"#FFF"
    },
    footerContainer: {
        padding : 8,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-evenly"
    },
    socialLinks:{
        fontSize: 16,
        color : "black",
        backgroundColor : "white",
        paddingHorizontal : 20,
        paddingVertical : 6,
        borderRadius : 6,
        elevation : 6
    }
})