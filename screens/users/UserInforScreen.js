import React from 'react'
import {connect} from 'react-redux'
import { Text, View, Button, TouchableOpacity } from 'react-native'
import userServices from '../../api/services/userServices'
import {getUserData} from '../../store/actions'
class UserInforScreen extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        //console.log(this.props.user)
        const userInfo = this.props.user
        return (
            <View>
                <Text> user infor screen </Text>
                <Text>First name: {userInfo.firstName? userInfo.firstName: 'Null'} </Text>
                <Text>Last name: {userInfo.lastName? userInfo.lastName: 'Null'} </Text>
                <Text>Role: {userInfo.role}</Text>
                <Text>Birthday: {userInfo.birthDay? userInfo.birthDay: 'Null'}</Text>
                <Text>Phone number: {userInfo.phoneNumber}</Text>
                <Text>E-mail: {userInfo.email}</Text>
                <Text>ID: {userInfo.socialID}</Text>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Favor')}
                >
                    <Text> Fav rooms</Text>
                </TouchableOpacity>
            </View>        
        )
    }
    
}
const mapStateToProps = state => {
    //console.log(state)
    //console.log('cunt')
    return({
        token: state.token,
        user: state.user
    })
}
const mapDispatchToProps = () => {
    return {
        getUserData
    }
}

    
export default connect(mapStateToProps, mapDispatchToProps())(UserInforScreen)