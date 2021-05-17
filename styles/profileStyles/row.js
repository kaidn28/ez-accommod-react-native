import React from 'react'
import {StyleSheet} from 'react-native'
import {defaultColor} from '../constStyles'

export default styles = StyleSheet.create({
    text: {
        fontSize: 15,
    },
    container: {
        backgroundColor: defaultColor.secondary,
        flexDirection: 'row',
        width: 420,
        height: 50,
        alignItems: 'center',
        padding: 10,
        margin: 2

    },
    smallText: {
        fontSize: 13,
    },
    smallContainer: {
        width: 400,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
        margin: 2        
    },
    icon: {
        marginLeft: 'auto'
    }
})