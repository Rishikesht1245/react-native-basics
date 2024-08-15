import React from "react";

import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    useColorScheme,
} from "react-native";
 
function AppPro(): React.JSX.Element {
    // usecolorscheme returns the theme of the device
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaView>
            <View style ={styles.container}>
                <Text style={isDarkMode ? styles.whiteText : styles.darkText}>
                    Hello world!!!!
                </Text>
                <Text style={isDarkMode ? styles.whiteText : styles.darkText}>
                    Hello world!!!!
                </Text>
            </View>
        </SafeAreaView>
    );
}


// styles is a binding of key value pairs
const styles = StyleSheet.create({
    container: {
        display : "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'lightgrey',
        gap:20
    },
    whiteText: {
        color: "#000000",
    },
    darkText: {
        color: "#000000",
    },
});


export default AppPro;