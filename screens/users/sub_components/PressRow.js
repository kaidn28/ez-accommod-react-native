import React from 'react'
import {Text, View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation} from '@react-navigation/native'


const PressRow = (props) => {
    //console.log(props)
    //console.log(props)
    const navigation = useNavigation()
    const seeDetails= () => {
        navigation.navigate(props.nav,{list: props.list})
    }
    return (
        <TouchableOpacity style={{borderTopWidth: 1}} onPress={seeDetails}>
            <View>
                <Text> {props.string}</Text>
            </View>
        </TouchableOpacity>)
}

export default PressRow