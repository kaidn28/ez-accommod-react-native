import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import 'intl'
import 'intl/locale-data/jsonp/vi'

import {defaultColor} from '../../styles/constStyles'
import itemStyles from '../../styles/roomListStyles'
import mainStyles from '../../styles/mainStyles'
import { ROOM_TYPES, ROOM_FACILITIES, CITIES, HANOI_DISTRICTS, HANOI_WARDS } from '../../consts/consts'

const defaultRoom = {
    roomTypes: ROOM_TYPES,
    roomFacilities: ROOM_FACILITIES,
    cities: CITIES,
    hanoiDistricts: HANOI_DISTRICTS,
    hanoiWards: HANOI_WARDS
}

const ServiceItem = ({facility}) => (
    <View style={itemStyles.facilityContainer}>
        <Text>{defaultRoom.roomFacilities.find(e => e.value == facility).name}</Text>
    </View>
)

const RoomListItem = ({item, onToggleFavorite}) => {
    const getImage = () => {
        if (item.images[0]) return {uri: item.images[0]}
        return require('../../assets/room01.jpg')
    }

    const roomFullAddress = () => {
        const findCity = defaultRoom.cities.find(e => e.id == item.address.city)
        const findDistrict = defaultRoom.hanoiDistricts.find(e => e.id == item.address.district)
        const findWard = defaultRoom.hanoiWards.find(e => e.id == item.address.ward)

        const city = findCity ? findCity.name : ''
        const district = findDistrict ? findDistrict.name : ''
        const ward = findWard ? findWard.name : ''
        const road = item.address.road

        return `${road}, ${ward}, ${district}, ${city}`
    }

    return (
        <View style={itemStyles.container}>
            <View style={mainStyles.container}>
                <Image 
                    style={itemStyles.image} 
                    source={getImage()}
                    resizeMode="contain"
                />
            </View>

            <View style={[mainStyles.centerContainer, itemStyles.roomTypeContainer]}>
                <Text style={itemStyles.roomType}>{defaultRoom.roomTypes.find(e => e.id == item.type).name || ''}</Text>
            </View>

            <View>
                <Text style={itemStyles.address}>{item.detailedAddress}</Text>
                <Text style={itemStyles.address}>{roomFullAddress()}</Text>
            </View>
            <View>
                <Text style={itemStyles.price}>{new Intl.NumberFormat('vi-VN').format(item.rooms[0].price.replace(/\D/g, '')) } đồng/tháng</Text>
            </View>
            {item.rooms[0].services.map(
                    (facility, i) => <ServiceItem facility={facility} key={i}></ServiceItem>
                )
            }

            <TouchableOpacity 
                style={mainStyles.centerContainer}
                onPress={() => onToggleFavorite(item)}
            >
                <Ionicons 
                    name={item.isFavorited ? 'heart' : 'heart-outline'}
                    size={30} 
                    color={defaultColor.primary}
                />
            </TouchableOpacity>
        </View>
    )
}

export default RoomListItem