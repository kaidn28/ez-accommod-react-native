import React from 'react'
import {useSelector} from 'react-redux'
import { View} from 'react-native'
import FavorRow from './sub_components/FavorRow'
import LogoutRow from './sub_components/LogoutRow'
import ProfileRow from './sub_components/ProfileRow'
import CreatePostRow from '../owner/sub_components/CreatePostRow'
import ManagePostRow from '../owner/sub_components/ManagePostRow'
import styles from '../../../styles/mainStyles'

const MenuScreen =() =>{
    const isOwner = useSelector(state => {
        return state.userReducer.user.role === 'owner'
    })
    return (
        <View style={{flex: 1, paddingTop: 10}}>
            <ProfileRow/>
            <FavorRow/>
            {isOwner && <CreatePostRow/>}
            {isOwner && <ManagePostRow/>}
            <LogoutRow/>
        </View>        
    )
}

    
export default MenuScreen