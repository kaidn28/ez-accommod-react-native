import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";

import { defaultColor, defaultBorder } from '../../../styles/constStyles'

class RoomOptionBar extends React.Component {
    render () {
        return (
            <View style={styles.barContainer}>
                <TouchableOpacity style={styles.option} onPress={this.props.onReportRoom}>
                <Ionicons
                    name={"alert-circle-outline"}
                    size={25}
                    color="black"
                />
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={this.props.onToggleFavorite}>
                <Ionicons
                    name={this.props.isFavorited ? 'heart' : 'heart-outline'}
                    size={25}
                    color={defaultColor.primary}
                />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    barContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'white',
        borderRadius: defaultBorder.borderRadius,
        borderWidth: defaultBorder.borderWidth,
        borderColor: defaultColor.primary,
        flexDirection: 'row'
    },
    option: {
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 10,
        marginRight: 10
    }
})

export default RoomOptionBar