import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {defaultColor} from '../../../styles/constStyles'
import itemStyles from '../../../styles/roomStyles/roomListStyles'
import mainStyles from '../../../styles/mainStyles'

import RoomFacilityList from './RoomFacilityList'


class RoomListItem extends React.Component {
    getImage = () => {
        if (this.props.item.images[0]) return {uri: this.props.item.images[0]}
        return require('../../../assets/room01.jpg')
    }

    render () {
        return (
            <View style={itemStyles.container}>
                <View style={mainStyles.container}>
                    <Image 
                        style={itemStyles.image} 
                        source={this.getImage()}
                        resizeMode="contain"
                    />
                </View>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Details', {id: this.props.item._id})}
                >
                    <View style={[mainStyles.centerContainer, itemStyles.roomTypeContainer, mainStyles.horizontalContainer]}>
                        <Text style={itemStyles.roomType}>{this.props.item.roomType}</Text>
                        <Ionicons 
                            name='chevron-forward-outline'
                            size={30} 
                            color={defaultColor.dark}
                        />
                    </View>
        
                    <View>
                        <Text style={itemStyles.address}>{this.props.item.detailedAddress}</Text>
                        <Text style={itemStyles.address}>{this.props.item.roomFullAddress}</Text>
                    </View>
                    <View>
                        <Text style={itemStyles.price}>{this.props.item.roomPrice} đồng/tháng</Text>
                    </View>
                </TouchableOpacity>
                
                <RoomFacilityList facilities={this.props.item.rooms[0].services}></RoomFacilityList>
    
                <TouchableOpacity 
                    style={mainStyles.centerContainer}
                    onPress={() => this.props.onToggleFavorite(this.props.item)}
                >
                    <Ionicons 
                        name={this.props.item.isFavorited ? 'heart' : 'heart-outline'}
                        size={30} 
                        color={defaultColor.primary}
                    />
                </TouchableOpacity>
            </View>
        )    
    }
}

export default RoomListItem