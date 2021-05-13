import { StyleSheet } from 'react-native';

import { defaultColor, defaultBorder } from './constStyles'

export default StyleSheet.create({
    modalView: {
        marginTop: 'auto',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 15,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    selector: {
        width: '100%',
        marginBottom: 10
    },
    filterLabel: {
        marginBottom: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 15,
        alignSelf: 'flex-start'
    },
    scrollSelector: {
        height: 150
    }
})