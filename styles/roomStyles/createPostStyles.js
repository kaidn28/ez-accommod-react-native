import { StyleSheet } from 'react-native';

import { defaultColor, defaultBorder } from '../constStyles'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    stepContainer: {
        flex: 1,
        paddingTop: 10,
    },
    viewContainer: {
        borderColor: defaultColor.dark,
        borderWidth: defaultBorder.borderWidth,
        borderRadius: defaultBorder.textInputRadius,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    titlebox: {
        backgroundColor: defaultColor.secondary,
        color: defaultColor.dark,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 10,
        marginRight: 10
    },
    readOnlyText: {
        marginLeft: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 3,
        marginBottom: 5,
        width: 100,
        alignSelf: 'flex-start',
        borderBottomWidth: 0.5,
        borderColor: defaultColor.dark
    },
    previewImg: {
        height: 150,
        width: 250,
        flex: 1,
        marginTop: 10,
    },
    inputContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5,
        width: '100%',
        borderColor: defaultColor.dark,
        borderWidth: defaultBorder.borderWidth,
        borderRadius: defaultBorder.textInputRadius
    },
    confirmButton: {
        marginTop: 15
    }
})