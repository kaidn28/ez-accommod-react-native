import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserFavorScreen from '../screens/users/UserFavorScreen'
import UserLoginScreen from '../screens/users/UserLoginScreen'
import UserInforScreen from '../screens/users/UserInforScreen'
import { useSelector } from 'react-redux'

const UserStackNav = createStackNavigator()

function UserStackNavConfigs(props){
    const isLoggedIn = useSelector(state => state.isLoggedIn)
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
                            title: 'Login',
                        }}
                    />
                    </>
                )
            }

        </UserStackNav.Navigator>
    )
}


export default UserStackNavConfigs