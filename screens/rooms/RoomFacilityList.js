import React from 'react'
import { View, SafeAreaView , FlatList, Text } from 'react-native'

import mainStyles from '../../styles/mainStyles'
import itemStyles from '../../styles/roomListStyles'

import { ROOM_FACILITIES } from '../../consts/consts'

const defaultRoom = {
    roomFacilities: ROOM_FACILITIES
}

const ServiceItem = ({facility}) => (
    <View style={itemStyles.facilityContainer}>
        <Text>{defaultRoom.roomFacilities.find(e => e.id == facility).name}</Text>
    </View>
)

class RoomFacilityList extends React.Component {
    renderItem = ({item}) => {
        return (<ServiceItem facility={item}></ServiceItem>)
    }

    render () {
        return (
            <SafeAreaView style={itemStyles.facList}>
                <FlatList
                    style={itemStyles.facilityList}
                    data={this.props.facilities}
                    renderItem={this.renderItem}
                    keyExtractor={(facility) => facility}
                />
            </SafeAreaView>
        )
    }
}

export default RoomFacilityList