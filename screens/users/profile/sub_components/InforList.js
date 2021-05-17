import React from 'react'
import { FlatList, View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {useSelector} from 'react-redux'
import Row from './Row'
const InforList = (props) => {
    const profile = useSelector(state => state.userReducer.user)
    const infoList = [
        {
            string: 'Họ',
            value: profile.lastName
        },
        {
            string: 'Tên',
            value: profile.firstName
        },
        {
            string: 'Email',
            value: profile.email
        },
        {
            string: 'Số CMND',
            value: profile.socialID
        },
        {
            string: 'Số điện thoại',
            value: profile.phoneNumber
        },
        {
            string: 'Loại người dùng',
            value: profile.role
        }
    ]

    // in các info thành 1 list

    return (
        <View>
            <FlatList
            data={infoList}
            renderItem={obj => <Row {...obj.item}/>}
            keyExtractor={item => item.string}
            />
        </View>
    )
}


export default InforList