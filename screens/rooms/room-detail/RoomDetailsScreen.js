import React from 'react'
import * as Linking from 'expo-linking';
import Ionicons from "react-native-vector-icons/Ionicons";

import 'intl'
import 'intl/locale-data/jsonp/vi'

import { connect } from 'react-redux'
import { addFavRoom, delFavRoom } from '../../../store/actions/roomActions'

import mainStyles from '../../../styles/mainStyles'
import itemStyles from '../../../styles/roomStyles/roomListStyles'
import { Text, View, ScrollView, Image, StyleSheet, SafeAreaView } from 'react-native'
import roomServices from '../../../api/services/roomServices'
import { ROOM_TYPES, CITIES, HANOI_DISTRICTS, HANOI_WARDS, ROOM_FACILITIES } from '../../../consts/consts'

import RoomFacilityList from '../room-list/RoomFacilityList'
import { defaultColor } from '../../../styles/constStyles'
import RoomOptionBar from './RoomOptionBar';

const defaultRoom = {
    roomTypes: ROOM_TYPES,
    roomFacilities: ROOM_FACILITIES,
    cities: CITIES,
    hanoiDistricts: HANOI_DISTRICTS,
    hanoiWards: HANOI_WARDS
}

class RoomDetailsScreen extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        area: "",
        address: "",
        type: "",
        numbersOfRoom: 0,
        price: 0,
        services: [],
        imageURI: ""
    }
    id = this.props.route.params.id
    // use this id to fetch detail

    onPressPhone = () => {
        Linking.openURL(`tel:${this.state.phoneNumber}`)
    }

    onRoomDetail = async (id) => {
        try {

            const data = await roomServices.getRoomDetail({ post_id: id })
            let detail = data.data.data.post
            console.log(detail.address.city)
            const findCity = defaultRoom.cities.find(e => e.id == detail.address.city)
            const findDistrict = defaultRoom.hanoiDistricts.find(e => e.id == detail.address.district)
            const findWard = defaultRoom.hanoiWards.find(e => e.id == detail.address.ward)

            const city = findCity ? findCity.name : ''
            const district = findDistrict ? findDistrict.name : ''
            const ward = findWard ? findWard.name : ''
            const road = detail.address.road

            const roomType = defaultRoom.roomTypes.find(e => e.id == detail.type).name || ''

            this.setState({
                firstName: detail.author.firstName,
                lastName: detail.author.lastName,
                phoneNumber: detail.author.phoneNumber,
                address: `${road}, ${ward}, ${district}, ${city}`,
                type: roomType,
                area: detail.rooms[0].area,
                price: detail.rooms[0].price,
                numbersOfRoom: detail.rooms[0].number,
                imageURI: detail.images[0],
                services: detail.rooms[0].services,
                isFavorited: detail.isFavorited
            })


        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }

    roomPrice = (item) => {
        if (!item) return null
        return new Intl.NumberFormat('vi-VN').format(item.replace(/\D/g, ''))
    }

    onReportRoom = () => {

    }

    onToggleFavorite = () => {
        console.log('fav', this.props)
        if (!this.props.isLoggedIn) {
            this.props.navigation.navigate('User')
            return
        }

        if (this.props.user.role != 'renter') {
            return
        }

        const roomId = this.id

        const isFavorited = this.state.isFavorited

        if (isFavorited) {
            this.onRemoveFavoriteRoom(roomId)
        } else {
            this.onFavoriteRoom(roomId)
        }
    }

    onFavoriteRoom = async (roomId) => {
        try {
            const data = await roomServices.favoriteRoom({ post_id: roomId })

            this.props.addFavRoom({ roomId })

            this.toggleFavorited()
        } catch (error) {
            console.log(error.response ? error.response.data : error)
            if (error.response) {
                this.setState({error: error.response.data})
            }
        }
    }

    onRemoveFavoriteRoom = async (roomId) => {
        try {
            const data = await roomServices.removeFavoriteRoom({ post_id: roomId })

            this.props.delFavRoom({ roomId })

            this.toggleFavorited()
        } catch (error) {
            console.log(error.response ? error.response.data : error)
            if (error.response) {
                this.setState({error: error.response.data})
            }
        }
    }

    toggleFavorited = () => {
        this.setState(prevState => ({isFavorited: !prevState.isFavorited}))
    }

    getImage = () => {
        if (this.state.imageURI) return { uri: this.state.imageURI }

        return require('../../../assets/room01.jpg')
    }

    componentDidMount() {
        this.onRoomDetail(this.id)
    }

    render() {

        return (
            <ScrollView>
                <View style={mainStyles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Image
                        source={this.getImage()}
                        style={{
                            width: 300,
                            height: 200,
                            marginTop: 10, 
                            marginBottom: 10
                        }}
                    />
                </View>
                <RoomOptionBar
                    onReportRoom={this.onReportRoom}
                    onToggleFavorite={this.onToggleFavorite}
                    isFavorited={this.state.isFavorited}
                ></RoomOptionBar>
                <View>
                    <Text style={styles.title}>Thông tin chung</Text>
                    <View style={itemStyles.container}>
                        <View style={mainStyles.horizontalContainer}>
                            <Text style={styles.item}>Họ tên chủ trọ: </Text>
                            <Text>{this.state.lastName + " "}{this.state.firstName}</Text>
                        </View>
                        <View style={mainStyles.horizontalContainer}>
                            <Text style={styles.item}>Số điện thoại liên lạc: </Text>
                            <Text style={styles.phoneNumber} onPress={this.onPressPhone}>{this.state.phoneNumber}</Text>
                            <Ionicons
                                name={"call-outline"}
                                size={25}
                                color="pink"
                            />
                        </View>
                        <View style={mainStyles.horizontalContainer}>
                            <Text style={styles.item}>Kiểu phòng cho thuê: </Text>
                            <Text>{this.state.type}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>Chi tiết loại phòng</Text>
                    <View style={itemStyles.container}>
                        <View style={itemStyles.facilityContainer}>
                            <Text style={styles.item}>Diện tích</Text>
                            <Text> {this.state.area} m2</Text>
                        </View>
                        <View style={itemStyles.facilityContainer}>
                            <Text style={styles.item}>Số phòng cho thuê</Text>
                            <Text> {this.state.numbersOfRoom} phòng</Text>
                        </View>
                        <View style={itemStyles.facilityContainer}>
                            <Text style={styles.item}>Địa chỉ</Text>
                            <Text> {this.state.address}</Text>
                        </View>
                        <View style={itemStyles.facilityContainer}>
                            <Text style={styles.item}>Cơ sở vật chất</Text>
                            <RoomFacilityList facilities={this.state.services}></RoomFacilityList>
                        </View>
                    </View>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={[styles.priceLabel, styles.title]}>Giá thuê</Text>
                    <Text style={[itemStyles.price, {paddingLeft: 10, paddingRight: 10}]}>{this.roomPrice(this.state.price)} đồng/tháng</Text>
                </View>

                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    item: {
        fontWeight: 'bold'
    },
    title: {
        marginLeft: 15,
        fontWeight: 'bold',
        color: defaultColor.dark
    },
    phoneNumber: {
        color: defaultColor.primary,
        fontWeight: 'bold'
    },
    priceLabel: {
        textAlign: 'center',
        fontSize: 17,
    }
})


const mapStateToProps = state => ({
    isLoggedIn: state.userReducer.isLoggedIn,
    userFavoriteRooms: state.roomReducer.userFavoriteRooms,
    user: state.userReducer.user
})

const mapActionsToProps = {
    addFavRoom,
    delFavRoom
}

export default connect(mapStateToProps, mapActionsToProps)(RoomDetailsScreen)