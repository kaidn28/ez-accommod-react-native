import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import RoomStackNavConfigs from './RoomStackNavigation'
import UserStackNavConfigs from './UserStackNavigation'
const TabNav = createBottomTabNavigator();

import Pusher from 'pusher-js/react-native';
import pusherConfig from '../pusher.json'

import {connect} from 'react-redux'

Pusher.logToConsole = true;

const pusher = new Pusher(pusherConfig.key, pusherConfig)

class MainTabNavConfigs extends React.Component{
    state = {
        channel: null
    }

    subscribePusher = () => {
        if (!this.props.isLoggedIn) return

        let channel = pusher.subscribe('user')

        channel.bind('post-authenticated', data => {
            console.log(data)
        })

        channel.bind('review-authenticated', data => {
            console.log(data)
        })

        this.setState({channel})
    }

    unsubPusher = () => {
        if (!this.state.channel) return
        
        pusher.unsubsribe('user')
        this.setState({
            channel: null
        })
    }

    componentDidMount () {
        this.subscribePusher()
    }

    componentDidUpdate () {
        if (this.props.isLoggedIn) {
            this.subscribePusher()
        } else {
            this.unsubPusher()
        }
    }

    render () {
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
}

const mapStateToProps = state => ({
    isLoggedIn: state.userReducer.isLoggedIn,
    user: state.userReducer.user
})

export default connect(mapStateToProps)(MainTabNavConfigs)