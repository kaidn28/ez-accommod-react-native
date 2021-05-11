import React from 'react'
import {Text, View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const PressRow = (props) => {
    //console.log(props)
    return (
        <TouchableOpacity style={{borderTopWidth: 2}}>
            <View>
                <Text> {props.string}</Text>
            </View>
        </TouchableOpacity>)
}

export default PressRow