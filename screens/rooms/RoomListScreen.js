import React from 'react'
import { Text, View, Button } from 'react-native'

const RoomListScreen = (props) => {
    return (
        <View>
            <Text> room list screen </Text>
            <Button title='to details' onPress={()=> props.navigation.navigate('Details')}></Button>
        </View>
        )
}

export default RoomListScreen