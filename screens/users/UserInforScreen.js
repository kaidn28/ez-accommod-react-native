import React from 'react'
import {connect} from 'react-redux'
import { Text, View, Button } from 'react-native'


class UserInforScreen extends React.Component{
    state = {
        user: null,
        token: null
    };

    getUser = () => {
        console.log(this.state)
    }
    componentDidMount(){
        this.getUser();
    }
    render(){
        return (
            <View>
                <Text> user infor screen </Text>
                <Button title="to favorite rooms" onPress={() => this.props.navigation.navigate('Favor')}/>
            </View>        
        )
    }
    
}
const mapStateToProps = state => {
    console.log(state)
    console.log('cunt')
    return({
        token: state.token,
        user: state.user
    })
}

    
export default connect(mapStateToProps)(UserInforScreen)