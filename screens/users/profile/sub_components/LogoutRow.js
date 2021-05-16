import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import store from '../../../../store/store'
import {logout} from '../../../../store/actions/userActions'
import styles from '../../../../styles/profileStyles/row'

const LogoutRow = () => {
    const logOut = () => {
        store.dispatch(logout())
    }
    return (
        <TouchableOpacity style={styles.container}
            onPress={logOut}
        >
            <Text style={styles.text}>Đăng xuất</Text>
            <Ionicons style={styles.icon}
                name='log-out-outline'
                size={25}
            >

            </Ionicons>
    </TouchableOpacity>)
}

export default LogoutRow