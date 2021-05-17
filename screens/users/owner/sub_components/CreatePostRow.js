import React from 'react'
import {Text, View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation} from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../../../../styles/profileStyles/row'
const CreatePostRow = (props) => {
    //console.log(props)
    //console.log(props)
    const navigation = useNavigation()
    const toCreatePost= () => {
        navigation.navigate('CreatePost')
    }
    return (
        <TouchableOpacity 
            onPress={toCreatePost}
            style={styles.container}
        >
            <Text style={styles.text}>Tạo bài đăng</Text>
            <Ionicons
                    style={styles.icon}
                    name='chevron-forward-outline'
                    size={25}
            />
        </TouchableOpacity>)
}

export default CreatePostRow