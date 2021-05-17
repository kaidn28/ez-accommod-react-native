import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserFavorScreen from '../screens/users/profile/UserFavorScreen'
import MenuScreen from '../screens/users/profile/MenuScreen'
import UserLoginScreen from '../screens/users/login/UserLoginScreen'
import UserSignUpScreen from '../screens/users/login/UserSignUpScreen'
import CreatePostScreen from '../screens/users/owner/CreatePostScreen'
import ManagePostScreen from '../screens/users/owner/ManagePostScreen'
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
                        name="Menu"
                        component = {MenuScreen}
                        options ={{
                            title: 'Menu',
                            headerTitleAlign: 'center'
                        }}
                    />
                    <UserStackNav.Screen
                        name="Favor"
                        component = {UserFavorScreen}
                        options = {{
                            title: 'Phòng bạn đã thích',
                            headerTitleAlign: 'center'
                        }}
                    />
                    <UserStackNav.Screen
                        name="CreatePost"
                        component={CreatePostScreen}
                        options={{
                            title: 'Tạo bài đăng mới',
                            headerTitleAlign: 'center'
                        }}
                    />
                    <UserStackNav.Screen
                        name="ManagePost"
                        component={ManagePostScreen}
                        options={{
                            title: 'Các bài đăng của bạn',
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