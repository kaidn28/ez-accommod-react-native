import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RoomListScreen from '../screens/rooms/room-list/RoomListScreen'
import RoomDetailsScreen from '../screens/rooms/room-detail/RoomDetailsScreen'

const RoomStackNav = createStackNavigator()

function RoomStackNavConfigs(props){
    return (
        <RoomStackNav.Navigator
            initialRouteName= "List"
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: 'pink'
                },
                headerShown: true
            }}
        >
        <RoomStackNav.Screen
            name="List"
            component={RoomListScreen}
            options={{
                title: 'Danh sách phòng'
            }}
        /> 
        <RoomStackNav.Screen
            name="Details"
            component={RoomDetailsScreen}
            options={{
                title: 'Thông tin phòng trọ'
            }}
        />
        </RoomStackNav.Navigator>
    )
}


export default RoomStackNavConfigs