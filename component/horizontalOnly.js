import React from "react";
import {
    View,
    StyleSheet,
    Dimensions
} from "react-native";
const Width = Dimensions.get('window').width;

import { colors } from "../assest/color";

export default function HorizontalOnly() {
    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 1,
        width: Width - 10,
        margin: 5,
        backgroundColor: colors.horizontalOnly
    }
})
