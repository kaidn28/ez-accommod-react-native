import React from 'react'
import { Text, TextInput, View, Button} from 'react-native'
import {Picker} from '@react-native-community/picker'
class UserSignUpScreen extends React.Component{
    constructor(props){
        super(props)
    }
    state = {
        email: this.props.route.params.email,
        password: '',
        firstName: '',
        lastName: '',
        role: 'renter',
        birthDay: null,
        phoneNumber: null,
        socialID: null,
        address: null,
    }
    
    render(){
        console.log(this.props)
        return (
            <View>
                <View>
                    <Text>Email: </Text>
                    <TextInput 
                        placeholder={this.props.route.params.email? this.props.route.params.email: 'VD: abc2000@gmail.com'}
                        onChangeText={email => this.setState({email})}
                    />
                </View>
                <View>
                    <Text>Họ: </Text>
                    <TextInput
                        placeholder='VD: Nguyễn'
                        onChangeText={lastName => this.setState({lastName})}
                    />
                </View>
                <View>
                    <Text>Tên: </Text>
                    <TextInput
                        placeholder='VD: An'
                        onChangeText={firstName => this.setState({firstName})}
                    />
                </View>
                <View>
                    <Text>Loại người dùng: </Text>
                    <Picker 
                        selectedValue={'renter'}
                        onValueChange={(role) => {this.setState({role})}}
                    >
                        <Picker.Item label='Người thuê trọ'value='renter'/>
                        <Picker.Item label='Chủ trọ'value='owner'/>
                    </Picker>
                </View>
                <Button title='Đăng ký' onPress={()=> {}}/>
            </View>
        )
    }
}

export default UserSignUpScreen