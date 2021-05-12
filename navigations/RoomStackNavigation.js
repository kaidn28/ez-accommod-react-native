import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RoomListScreen from '../screens/rooms/RoomListScreen'
import RoomDetailsScreen from '../screens/rooms/RoomDetailsScreen'

const RoomStackNav = createStackNavigator()

function RoomStackNavConfigs(props){
    return (
        <RoomStackNav.Navigator
            initialRouteName= "List"
        >
        <RoomStackNav.Screen
            name="List"
            component={RoomListScreen}
            options= {{
                title: 'Room List',
                headerTitleAlign: 'center',
            }}
        /> 
        <RoomStackNav.Screen
            name="Details"
            component={RoomDetailsScreen}
            options = {{
                title: 'room details',
                headerTitleAlign: 'center'
            }}
        />
        </RoomStackNav.Navigator>
    )
}


export default RoomStackNavConfigs