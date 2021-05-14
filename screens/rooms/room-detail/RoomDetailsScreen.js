import React from 'react'
import { Text, View } from 'react-native'

class RoomDetailsScreen extends React.Component {
    id = this.props.route.params.id
    // use this id to fetch detail

    render () {
        return (
            <Text> room details screen </Text>
        )
    }
}

export default RoomDetailsScreen