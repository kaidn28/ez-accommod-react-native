import React from 'react'
import { Text, View, Button } from 'react-native'
import store from '../../store/store'
import {login} from '../../store/actions'
const UserLoginScreen = () => {
    return (
        <View>
            <Text> user login screen </Text>
            <Button title="to user info" onPress={()=> store.dispatch(login())}/>
        </View>

        )
}

export default UserLoginScreen