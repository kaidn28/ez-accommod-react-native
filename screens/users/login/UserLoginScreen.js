import React from 'react'
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native'

import store from '../../../store/store'
import {login} from '../../../store/actions/userActions'

class UserLoginScreen extends React.Component {
    state = {
        email: '',
        password: '',
        validationSuccess: false
    };
    submitLogin = ()=> {
        const email = this.state.email;
        const password = this.state.password;
        const payload = {
            email: this.state.email,
            password: this.state.password
        }
        store.dispatch(login(payload))
    };
    validate = ()=> {
        return (this.state.email.includes('@') && this.state.password.length>=6)
    };
    toSignUp = () => {
        this.props.navigation.navigate('SignUp', {email: this.state.email})
    };

    render(){

        return (
            <View>
                <Text> Login </Text>
                <TextInput placeholder="Username" onChangeText={email => this.setState({email})}/>
                <TextInput placeholder="Password" secureTextEntry={true} onChangeText={password => this.setState({password})}/>
                <Button 
                    title="Đăng nhập" 
                    onPress={this.submitLogin}
                    disabled={!this.validate()}
                />
                <View>
                    <View>
                        <Text>Chưa có tài khoản?</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={this.toSignUp}
                        >
                            <Text style={{color: 'blue'}}> Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    
            )
    } 
}

export default UserLoginScreen