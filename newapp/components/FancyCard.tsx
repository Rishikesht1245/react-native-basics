import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FancyCard() {
    return (

        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.headingText}>Trending Places</Text>
                <View style={[styles.card, styles.elevated]}>
                    <Image style={styles.cardImg} source={{uri: "https://picsum.photos/200"}}/>
                    <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>Hawa Mahal</Text>
                        <Text style={styles.cardLabel}>Jaipur, India</Text>
                        <Text style={styles.cardDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sequi dolorem tenetur quas amet neque sit pariatur a non voluptates!</Text>
                        <Text style={styles.cardFooter}>12 minutes away!</Text>
                    </View>
                </View>
                <View style={[styles.card, styles.elevated]}>
                    <Image style={styles.cardImg} source={{uri: "https://picsum.photos/200"}}/>
                    <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>Hawa Mahal</Text>
                        <Text style={styles.cardLabel}>Jaipur, India</Text>
                        <Text style={styles.cardDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sequi dolorem tenetur quas amet neque sit pariatur a non voluptates!</Text>
                        <Text style={styles.cardFooter}>12 minutes away!</Text>
                    </View>
                </View>
                <View style={[styles.card, styles.elevated]}>
                    <Image style={styles.cardImg} source={{uri: "https://picsum.photos/200"}}/>
                    <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>Hawa Mahal</Text>
                        <Text style={styles.cardLabel}>Jaipur, India</Text>
                        <Text style={styles.cardDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sequi dolorem tenetur quas amet neque sit pariatur a non voluptates!</Text>
                        <Text style={styles.cardFooter}>12 minutes away!</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headingText : {
        fontSize : 24,
        fontWeight : "bold",
        paddingHorizontal : 10,
    },
    container:{
       padding: 8,

    },
    card : {
        width : 350,
        height : 350,
        borderRadius : 6,
        marginVertical: 12,
        marginHorizontal : 16,
        padding : 8
    },
    elevated : {
        backgroundColor : "white",
        elevation : 3,
        shadowOffset:{
            width : 1,
            height : 1
        }
    },
    cardImg: {
        height : 180,
        marginBottom : 8,
        borderTopLeftRadius : 20,
        borderBottomRightRadius : 20,
    },
    cardBody: {
        flex: 1,
        flexGrow : 1,
        paddingHorizontal : 12
    },
    cardTitle:{
        fontSize : 22,
        fontWeight : "bold",
        marginBottom : 4
    },
    cardLabel:{
        fontSize : 14,
        marginBottom : 6,
    },
    cardDescription:{
        fontSize : 12,
        marginBottom : 12,
        flexShrink : 1
    },
    cardFooter:{
        fontSize : 12
    }
})