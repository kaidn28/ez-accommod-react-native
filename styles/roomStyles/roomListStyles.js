import { StyleSheet } from 'react-native';

import { defaultColor, defaultBorder } from '../constStyles'

export default StyleSheet.create({
    container: {
        borderColor: defaultColor.dark,
        borderRadius: defaultBorder.borderRadius,
        borderWidth: defaultBorder.borderWidth,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        margin: 10,
        backgroundColor: '#fff',
        width: 350
    },
    roomList: {
        maxHeight: 700
    },
    image: {
        height: 150,
        width: 250,
        flex: 1
    },
    roomTypeContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    roomType: {
        fontSize: 20,
        fontWeight: 'bold',
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
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5,
        backgroundColor: defaultColor.light
    },
    facList: {
        height: 240
    }
})