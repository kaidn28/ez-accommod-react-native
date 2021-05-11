import React from 'react'
import { Text, View, Button, TextInput } from 'react-native'

import store from '../../store/store'
import {login} from '../../store/actions/userActions'

class UserLoginScreen extends React.Component {
    state = {
        email: null,
        password: null
    }
    submitLogin = ()=> {
        const email = this.state.email;
        const password = this.state.password;
        const payload = {
            email: this.state.email,
            password: this.state.password
        }
        store.dispatch(login(payload))
    }
    render(){
        return (
            <View>
                <Text> Login </Text>
                <TextInput placeholder="Username" onChangeText={email => this.setState({email})}/>
                <TextInput placeholder="Password" onChangeText={password => this.setState({password})}/>
                <Button title="to user info" onPress={this.submitLogin}/>
            </View>
    
            )
    } 
}

export default UserLoginScreen