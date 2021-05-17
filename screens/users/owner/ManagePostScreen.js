import React from 'react'
import {Text, View, Button} from 'react-native'

const ManagePostScreen = (props) => {
    return (
        <View>
            <Text> Manage Post Screen</Text>
            <Button
                title='back to menu'
                onPress={()=>props.navigation.navigate('Menu')}
            />
        </View>
    )
}

export default ManagePostScreen