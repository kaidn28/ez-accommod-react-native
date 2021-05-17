import React from 'react'
import {Text, View, Button} from 'react-native'

export default CreatePostScreen = (props) => {
    //console.log(props)
    return (
        <View>
            <Text> Create Post Screen</Text>
            <Button
                title='back to menu'
                onPress={()=>props.navigation.navigate('Infor')}
            />
        </View>
    )
}