import { StyleSheet } from 'react-native';

import { defaultColor, defaultBorderRadius } from './constStyles'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30
    },
    error: {
      color: 'red',
    },
    centerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    }
});
  