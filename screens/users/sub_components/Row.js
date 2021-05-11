import React from 'react'
import {Text, View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Row = (props) => {
    //console.log(props)
    return (
        <TouchableOpacity style={{borderTopWidth: 1}}>
            <View>
                <Text> {props.string}</Text>
            </View>
            <View>
                <Text> {props.info? props.info: 'Null'}</Text>
            </View>
        </TouchableOpacity>)
}

export default Row