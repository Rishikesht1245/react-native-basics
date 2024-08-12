import React from "react";

import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    useColorScheme,
} from "react-native";
 
function AppPro(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={isDarkMode ? styles.darkText : styles.whiteText}>
                    Hello world!
                </Text>
            </View>
        </SafeAreaView>
    );
}


// styles is a binding of key value pairs
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'lightgrey', // Add a background color for debugging
    },
    whiteText: {
        color: "#000000",
    },
    darkText: {
        color: "#000000",
    },
});


export default AppPro;