import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import RoomStackNavConfigs from './RoomStackNavigation'
import UserStackNavConfigs from './UserStackNavigation'
const TabNav = createBottomTabNavigator();

function MainTabNavConfigs({route, navigation}){
    return (
        <TabNav.Navigator
            initialRouteName="Room"
            tabBarOptions={{
                showLabel: false
            }}
        >
            <TabNav.Screen 
                name="Room" 
                options= {{
                    title: 'Rooms',
                    tabBarIcon: ({focused}) => (
                        <Ionicons 
                            name={focused? 'list': 'list-outline'} 
                            size={focused? 30: 25} 
                            color='pink'
                        />
                    )
                }}
            >
                {()=> 
                <RoomStackNavConfigs 
                />}
            </TabNav.Screen>
            <TabNav.Screen 
                name="User" 
                options= {{
                    title: "User",
                    tabBarIcon: ({focused}) => (
                        <Ionicons 
                            name={focused? 'person': 'person-outline'} 
                            size={focused? 30: 25} 
                            color='pink'
                        />
                    )
                }}
            >
                {() =><UserStackNavConfigs 
                />}
            </TabNav.Screen>
            
        </TabNav.Navigator>
    )
}

export default MainTabNavConfigs