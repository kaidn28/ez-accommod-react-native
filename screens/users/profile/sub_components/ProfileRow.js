import React, {useState} from 'react'
import {FlatList, Text, View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {useSelector} from 'react-redux'
import InforList from './InforList';
import styles from '../../../../styles/profileStyles/row'
const ProfileRow = () => {
    const [showInfo, toggleInfo] = useState(false)    
    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={() => toggleInfo(!showInfo)}
            >
                <Text style={styles.text}>Thông tin người dùng</Text>
                <Ionicons
                    style={{marginLeft: 'auto'}}
                    name={showInfo? 'chevron-down-outline': 'chevron-forward-outline'}
                    size={25}
                />
                
            </TouchableOpacity>
            {showInfo && <InforList/>}
        </View>
        
    )
}

export default ProfileRow