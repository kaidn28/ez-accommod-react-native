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
        >
            <TabNav.Screen 
                name="Room" 
                options= {{
                    title: "Room List",
                    tabBarIcon: ({focused, tintColor}) => {
                        if(focused){
                            return <Ionicons 
                            name='list-outline'
                            size={25} 
                            color='blue'/>
                            
                        }
                        else {
                            return <Ionicons 
                            name='list-outline'
                            size={25} 
                            color='black'
                        />
                        }
                    }

                    
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
                    tabBarIcon: ({focused, tintColor}) => {
                        if(focused){
                            return <Ionicons 
                            name='person-outline'
                            size={25} 
                            color='blue'/>
                            
                        }
                        else {
                            return <Ionicons 
                            name='person-outline'
                            size={25} 
                            color='black'
                            />
                        }
                    } 
                }}
            >
                {() =><UserStackNavConfigs 
                />}
            </TabNav.Screen>
            
        </TabNav.Navigator>
    )
}

export default MainTabNavConfigs