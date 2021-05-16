import React from 'react'
import {StyleSheet} from 'react-native'
import {defaultColor, defaultBorder} from '../constStyles'
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: defaultColor.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        borderWidth: defaultBorder.borderWidth,
        borderRadius: defaultBorder.borderRadius
    },
    textInput: {
        fontSize: 15,
        width: 300,
        marginBottom: 5
        
    },
    text: {
        fontSize: 15
    },
    errorMessage: {
        color: 'red'
    },
    header: {

    },
    picker: {

    },
    enabledButton: {
        backgroundColor: defaultColor.secondary,
        borderRadius: 10,
        padding: 10
    },
    disabledButton: {
        backgroundColor: defaultColor.disabled,
        borderRadius: 10,
        padding: 10
    }
})

export default styles