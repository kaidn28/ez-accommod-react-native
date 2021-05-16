import React from 'react'
import {Text, View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../../../../styles/profileStyles/row'
const Row = (props) => {
    //console.log(props)
    return (
        <View style={{alignItems: 'center'}}>
            <View style={styles.smallContainer}>
                <Text style={styles.text}> {props.string}: </Text>
                <Text style={styles.smallText}> {props.value? props.value: 'Null'}</Text>
            </View>
            
        </View>)
}

export default Row