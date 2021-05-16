import React from 'react'
import {connect} from 'react-redux'
import { View} from 'react-native'
import {getUserData} from '../../../store/actions/userActions'
import InforList from './sub_components/InforList'
import FavorRow from './sub_components/FavorRow'
import LogoutRow from './sub_components/LogoutRow'
import ProfileRow from './sub_components/ProfileRow'
import styles from '../../../styles/mainStyles'
class UserInforScreen extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        //console.log(this.props.user)
        const userInfo = this.props.user
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ProfileRow/>
                <FavorRow/>
                <LogoutRow/>
            </View>        
        )
    }
    
}
const mapStateToProps = state => {
    return({
        token: state.userReducer.token,
        user: state.userReducer.user
    })
}
const mapDispatchToProps = () => {
    return {
        getUserData
    }
}

    
export default connect(mapStateToProps, mapDispatchToProps())(UserInforScreen)