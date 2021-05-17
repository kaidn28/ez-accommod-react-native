import React from 'react'
import {TouchableOpacity, Text, View, Alert} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import store from '../../../../store/store'
import {logout} from '../../../../store/actions/userActions'
import styles from '../../../../styles/profileStyles/row'

const LogoutRow = () => {
    
    const logOut = () => {
        store.dispatch(logout())
    };
    const showAlert = () => 
        Alert.alert(
            "Đăng xuất",
            "Bạn có chắc chắn muốn đăng xuất?",
            [
                {
                    text: "Có",
                    onPress: logOut 
                },
                {
                    text: "Không",
                    style: "cancel"
                }
            ],
            {
                cancelable: true,
            }
            
        )
    ;
    return (
        <TouchableOpacity style={styles.container}
            onPress={showAlert}
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