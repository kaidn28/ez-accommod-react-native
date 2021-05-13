import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    optionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionBarToolSet: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 30
    },
    icon: {
        marginLeft: 15
    },
})