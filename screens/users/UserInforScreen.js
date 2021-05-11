import React from 'react'
import {connect} from 'react-redux'
import { Text, View, Button, TouchableOpacity, FlatList } from 'react-native'
import userServices from '../../api/services/userServices'
import {getUserData} from '../../store/actions'
import InforList from './sub_components/InforList'
class UserInforScreen extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        //console.log(this.props.user)
        const userInfo = this.props.user
        return (
            <View>
                <Text> User Infor Screen</Text>
                <View>
                    <InforList {...userInfo}/>
                </View>
            </View>        
        )
    }
    
}
const mapStateToProps = state => {
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