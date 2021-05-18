import React from 'react'
import {Text, View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation} from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../../../../styles/profileStyles/row'
const ManagePostRow = (props) => {
    //console.log(props)
    //console.log(props)
    const navigation = useNavigation()
    const toManagePost= () => {
        navigation.navigate('ManagePost')
    }
    return (
        <TouchableOpacity 
            disabled={true}
            onPress={toManagePost}
            style={{...styles.container, backgroundColor:'#cccccc'}}
        >
            <Text style={styles.text}>Quản lý bài đăng</Text>
            <Ionicons
                    style={styles.icon}
                    name='chevron-forward-outline'
                    size={25}
            />
        </TouchableOpacity>)
}

export default ManagePostRow