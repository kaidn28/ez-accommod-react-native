import { StyleSheet } from 'react-native';

import { defaultColor, defaultBorderRadius } from './constStyles'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    containerWithHeader: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 15
    },
    containerWithoutHeader: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 45
    },
    error: {
      color: 'red',
    },
    warning: {
      color: defaultColor.warning,
    },
    boldText: {
      marginTop: 15,
      fontSize: 16,
      fontWeight: 'bold'
    },
    reminder: {
      color: 'gray',
      fontSize: 12
    },
    centerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftmost: {
      alignSelf: 'flex-start'
    },
    horizontalContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    }
});
  