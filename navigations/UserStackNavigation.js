import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserFavorScreen from '../screens/users/profile/UserFavorScreen'
import UserInforScreen from '../screens/users/profile/UserInforScreen'
import UserLoginScreen from '../screens/users/login/UserLoginScreen'
import UserSignUpScreen from '../screens/users/login/UserSignUpScreen'

import { useSelector } from 'react-redux'
const UserStackNav = createStackNavigator()

function UserStackNavConfigs(props){
    const isLoggedIn = useSelector(state => {
        //console.log('LOOK HERE')
        //console.log(state)   
        return state.userReducer.isLoggedIn
    })
    //console.log(isLoggedIn)
    return (
        <UserStackNav.Navigator
            initialRouteName= "Login"
        >
            {
                isLoggedIn? (
                    <>
                    <UserStackNav.Screen
                        name="Infor"
                        component = {UserInforScreen}
                        options ={{
                            title: 'Your Information',
                            headerTitleAlign: 'center'
                        }}
                    />
                    <UserStackNav.Screen
                        name="Favor"
                        component = {UserFavorScreen}
                        options = {{
                            title: 'Your favorite rooms',
                            headerTitleAlign: 'center'
                        }}
                    />
                    </>
                ):(
                    <>
                    <UserStackNav.Screen
                        name="Login"
                        component= {UserLoginScreen}
                        options = {{
                            title: 'Đăng nhập',
                            headerTitleAlign: 'center',
                            headerShown: false
                        }}
                    />
                    <UserStackNav.Screen
                        name="SignUp"
                        component={UserSignUpScreen}
                        options = {{
                            title: 'Đăng ký',
                            headerTitleAlign: 'center',
                            headerShown: false
                        }}
                    />
                    </>
                )
            }

        </UserStackNav.Navigator>
    )
}


export default UserStackNavConfigs