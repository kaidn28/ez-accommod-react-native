import React from 'react'
import { Text, TextInput, View, Button, ScrollView, TouchableOpacity} from 'react-native'
import {Picker} from '@react-native-community/picker'
import userServices from '../../../api/services/userServices'
import styles from '../../../styles/authStyles/formStyles'
import Ionicons from 'react-native-vector-icons/Ionicons'
class UserSignUpScreen extends React.Component{
    constructor(props){
        super(props)
    }
    state = {
        email: this.props.route.params.email,
        password: '',
        reEnterPassword: '',
        firstName: '',
        lastName: '',
        role: 'renter',
        phoneNumber: '',
        socialID: '',
        address: '',
        emailError: null,
        passwordError: null,
        reEnterPasswordError: null,
        lastNameError: null,
        firstNameError: null,
        idError: null,
        phoneNumberError: null,
        beMessage: '',
        waitForResponse: false
    }

    validateEmail = () => {
        //console.log(this.state.emailError)
        const valid = this.state.email.includes('@')
        if(!valid){
            this.setState({emailError: 'Email không hợp lệ'})
            return 
        }
        this.setState({emailError: null})
        return 
    }
    
    validatePassword = () => {
        const valid = this.state.password.length >=6;
        if (!valid){
            this.setState({passwordError: 'Mật khẩu phải có ít nhất 6 ký tự'})
            return 
        }
        this.setState({passwordError: null})
        return
    }

    validateReEnterPassword = () => {
        const valid1 = this.state.reEnterPassword === this.state.password;
        //console.log('1')
        //console.log(valid1)
        const valid2 = this.state.reEnterPassword.length > 0;
        if (!valid1 || !valid2) {
            this.setState({reEnterPasswordError: 'Mật khẩu không khớp'})
            return 
        }
        this.setState({reEnterPasswordError: null})
        return
    }

    validateLastName =() => {
        const valid = this.state.lastName
        if(!valid){
            this.setState({lastNameError: 'Họ không thể bỏ trống'})
            return
        }
        this.setState({lastNameError: null})
        return 
    }

    validateFirstName = () => {
        const valid1 = this.state.firstName
        const valid2 = /\s/.test(this.state.firstName);
        //console.log(valid2)
        if(!valid1){
            this.setState({firstNameError: 'Tên không thể bỏ trống'})
            return
        }
        if(valid2){
            this.setState({firstNameError: 'Tên không thể chứa dấu cách'})
            return 
        }
        this.setState({firstNameError: null})
        return
    }

    validateID = () => {
        const valid = this.state.socialID.length === 9 || this.state.socialID.length === 12;
        //console.log(valid)
        if(!valid){
            this.setState({idError: 'Số cmnd không hợp lệ'})
            return
        }
        this.setState({idError: null})
        return        
    }

    validatePhoneNumber = () => {
        const valid = this.state.phoneNumber.length === 10;
        if (!valid){
            this.setState({phoneNumberError: 'Số điện thoại không hợp lệ'})
            return
        }
        this.setState({phoneNumberError: null})
        return
    }
    validate = () => {
        // console.log(this.state.email);
        // console.log(this.state.password);
        // console.log(this.state.reEnterPassword);
        // console.log(this.state.firstName);
        // console.log(this.state.lastName);
        // console.log(this.state.emailError);
        // console.log(this.state.passwordError);
        // console.log(this.state.reEnterPasswordError);
        // console.log(this.state.lastNameError);
        // console.log(this.state.firstNameError);

        return (
                this.state.email.length > 0 &&
                this.state.password.length > 0 &&
                this.state.firstName.length > 0 &&
                this.state.lastName.length > 0 &&
                this.state.emailError === null && 
                this.state.passwordError === null && 
                this.state.reEnterPasswordError === null && 
                this.state.lastNameError === null &&
                this.state.firstNameError === null
                )
    }
    signup = async () => {
        this.setState({waitForResponse: true})
        const email = this.state.email;
        const password = this.state.password;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const role = this.state.role;
        const socialID = this.state.socialID;
        const address = this.state.address;
        const phoneNumber = this.state.phoneNumber;
        const formData = {
            email,
            password,
            firstName,
            lastName, 
            socialID,
            address,
            phoneNumber
        } 
        const valid = this.validate()
        //console.log(valid)
        if (valid) {
            try {
                const res = await userServices.signup(formData)
                //console.log(res)
                console.log(res.data.status)
                if(res.data.status === 'success'){
                    const beMessage = 'Đăng ký thành công';
                    this.setState({beMessage});
                    setTimeout(()=> this.props.navigation.push('Login',{email, password}), 500)
                }
            }
            catch(err){
                console.log(err.response.data);
                const beMessage = err.response.data.message;
                this.setState({beMessage});
            }
            
        }
        else {
            alert('Thông tin đăng ký không hợp lệ')
        }
        this.setState({waitForResponse: false})
    }
    render(){
        //console.log(this.props)
        return (
            <ScrollView contentContainerStyle={styles.screen}>
                <View style={{width: 400}}>
                    <TouchableOpacity 
                        style={{flexDirection: 'row'}}
                        onPress={() => this.props.navigation.goBack()}
                        >
                        <Ionicons
                            name='arrow-back-outline'
                            size={25}
                        />
                        <View>
                            <Text style={{...styles.text, marginTop: 1}}>Về đăng nhập</Text>
                        </View>
                        
                    </TouchableOpacity>
                </View>
                
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={{fontSize: 20}}> Đăng ký </Text>
                    </View>
                    <View>
                        <Text style={styles.text}>Email *: </Text>
                        <TextInput style ={styles.textInput}
                            placeholder={this.props.route.params.email? this.props.route.params.email: 'VD: abc2000@gmail.com'}
                            onChangeText={email => this.setState({email})}
                            onEndEditing={this.validateEmail}
                        />
                        {this.state.emailError && <Text style={styles.errorMessage}>{this.state.emailError} </Text>}
                    </View>
                    <View>
                        <Text style={styles.text}>Mật khẩu *:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Nhập mật khẩu (Ít nhất 6 kí tự)'
                            onChangeText={password => this.setState({password})}
                            secureTextEntry={true}
                            onEndEditing={this.validatePassword}
                        />
                        {this.state.passwordError && <Text style={styles.errorMessage}>{this.state.passwordError}</Text>}
                    </View>
                    <View>
                        <Text style={styles.text}>Nhập lại mật khẩu *:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Nhập lại mật khẩu (ít nhất 6 kí tự)'
                            onChangeText={reEnterPassword => this.setState({reEnterPassword})}
                            secureTextEntry={true}
                            onEndEditing={this.validateReEnterPassword}
                        /> 
                        {this.state.reEnterPasswordError && <Text style={styles.errorMessage}>{this.state.reEnterPasswordError}</Text>} 
                    </View>
                    <View>
                        <Text style={styles.text}>Họ *: </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='VD: Nguyễn'
                            onChangeText={lastName => this.setState({lastName})}
                            onEndEditing={this.validateLastName}
                        />
                        {this.state.lastNameError && <Text style={styles.errorMessage}>{this.state.lastNameError}</Text>}
                    </View>
                    <View>
                        <Text style={styles.text}>Tên *: </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='VD: An'
                            onChangeText={firstName => this.setState({firstName})}
                            onEndEditing={this.validateFirstName}
                        />
                        {this.state.firstNameError && <Text style={styles.errorMessage}>{this.state.firstNameError}</Text>}
                    </View>
                    <View>
                        <Text style={styles.text}>Loại người dùng *: </Text>
                        <Picker 
                            style={{...styles.textInput, height: 30}}
                            selectedValue={this.state.role}
                            onValueChange={(role) => this.setState({role})}
                        >
                            <Picker.Item 
                                
                                label='Người thuê trọ' value='renter'/>
                            <Picker.Item label='Chủ trọ' value='owner'/>
                        </Picker>
                    </View>
                    <Text style={styles.text}>Thông tin bổ sung: </Text>
                    <View>
                        <Text style={styles.text}>Số CMND: </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='VD: 123456789012'
                            onChangeText={socialID => this.setState({socialID})}
                            onEndEditing={this.validateID}
                        />
                        {this.state.idError && <Text style={styles.errorMessage}>{this.state.idError}</Text>}
                    </View>
                    <View>
                        <Text style={styles.text}>Địa chỉ: </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='VD: Số 144, đường Xuân Thủy...'
                            onChangeText={address => this.setState({address})}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Số điện thoại: </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='VD: 0912345678'
                            onChangeText={phoneNumber => this.setState({phoneNumber})}
                            onEndEditing={this.validatePhoneNumber}
                        />
                        {this.state.phoneNumberError && <Text> {this.state.phoneNumberError} </Text>}
                    </View>
                    
                    <View>
                        <Text style={styles.text}> Các mục có dấu (*) bắt buộc nhập</Text>
                    </View>
                    <TouchableOpacity  
                        onPress={this.signup}
                        disabled={this.state.waitForResponse || !this.validate()}
                        style={(!this.state.waitForResponse && this.validate())? styles.enabledButton: styles.disabledButton}
                    >
                        <Text style={styles.text}> Đăng ký </Text>
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.errorMessage}> {this.state.beMessage? this.state.beMessage: null}</Text>
            </ScrollView>
        )
    }
}

export default UserSignUpScreen