import { StyleSheet } from 'react-native';

import { defaultColor, defaultBorder } from './constStyles'

export default StyleSheet.create({
    container: {
        borderColor: defaultColor.dark,
        borderRadius: defaultBorder.borderRadius,
        borderWidth: defaultBorder.borderWidth,
        padding: 20,
        margin: 10,
        backgroundColor: '#fff'
    },
    image: {
        height: 150,
        width: 250,
    },
    roomType: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    address: {
        fontWeight: '700'
    },
    price: {
        fontWeight: 'bold',
        fontSize: 25,
        color: defaultColor.dark,
        backgroundColor: defaultColor.secondary,
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        borderTopLeftRadius: defaultBorder.borderRadius,
        borderBottomRightRadius: defaultBorder.borderRadius,
        marginTop: 5,
        marginBottom: 5
    },
    facilityContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'gray'
    }
})