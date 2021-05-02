import React from 'react'
import { Text, View, Button } from 'react-native'

const UserInforScreen = (props) => {
    return (
        <View>
            <Text> user infor screen </Text>
            <Button title="to favorite rooms" onPress={() => props.navigation.navigate('Favor')}/>
        </View>        
    
    )
}

export default UserInforScreen