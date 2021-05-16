import React from 'react'
import {Text, View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation} from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../../../../styles/profileStyles/row'
const FavorRow = (props) => {
    //console.log(props)
    //console.log(props)
    const navigation = useNavigation()
    const seeFavors= () => {
        navigation.navigate('Favor',{list: props.list})
    }
    return (
        <TouchableOpacity 
            onPress={seeFavors}
            style={styles.container}
        >
            <Text style={styles.text}>Phòng yêu thích</Text>
            <Ionicons
                    style={styles.icon}
                    name='chevron-forward-outline'
                    size={25}
            />
        </TouchableOpacity>)
}

export default FavorRow