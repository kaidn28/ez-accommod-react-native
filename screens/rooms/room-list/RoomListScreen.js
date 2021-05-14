import React from 'react'
import { View } from 'react-native'
import {connect} from 'react-redux'

import 'intl'
import 'intl/locale-data/jsonp/vi'

import RoomListOptionBar from './RoomListOptionBar'
import RoomList from './RoomList'
import RoomFilterModal from './RoomFilterModal'

import roomServices from '../../../api/services/roomServices'

import mainStyles from '../../../styles/mainStyles'

import { ROOM_TYPES, CITIES, HANOI_DISTRICTS, HANOI_WARDS } from '../../../consts/consts'

const defaultRoom = {
    roomTypes: ROOM_TYPES,
    cities: CITIES,
    hanoiDistricts: HANOI_DISTRICTS,
    hanoiWards: HANOI_WARDS
}

const ALLOW_ROOM_FIELDS = [
    '_id', 'images', 'rooms'
]

class RoomListScreen extends React.Component {
    state = {
        rooms: [],
        currentPage: 1,
        lastFetchedPage: 0,
        reachLastPage: false,
        modalVisible: false,
        errorMessage: '',
        DEFAULT_PAGINATION_LIMIT: 5,
    }

    resetSettings = () => {
        this.setState({
            currentPage: 1,
            lastFetchedPage: 0,
            reachLastPage: false,
            errorMessage: ''
        })
    }

    setError = (err) => {
        this.setState({errorMessage: err})
    }

    setRooms = (newRooms) => {
        this.setState({rooms: newRooms})
    }

    getDefaultList = () => {
        this.resetSettings()
        this.getRoomList()
    }

    openFilterModal = () => {
        this.setState({modalVisible: true})
    }

    closeFilterModal = () => {
        this.setState({modalVisible: false})
    }

    /*
    *   ROOMLIST FUNCTIONS
    */

    /*
    *   Get string address from int array
    */
    roomFullAddress = (item) => {
        const findCity = defaultRoom.cities.find(e => e.id == item.address.city)
        const findDistrict = defaultRoom.hanoiDistricts.find(e => e.id == item.address.district)
        const findWard = defaultRoom.hanoiWards.find(e => e.id == item.address.ward)

        const city = findCity ? findCity.name : ''
        const district = findDistrict ? findDistrict.name : ''
        const ward = findWard ? findWard.name : ''
        const road = item.address.road

        return `${road}, ${ward}, ${district}, ${city}`
    }

    roomType = (item) => {
        return defaultRoom.roomTypes.find(e => e.id == item.type).name || ''
    }

    roomPrice = (item) => {
        return new Intl.NumberFormat('vi-VN').format(item.rooms[0].price.replace(/\D/g, '')) 
    }

    /*
    *   Filter fields to reduce data size
    */
    filterAllowFields = (item) => {
        const res = Object.keys(item)
                    .reduce((accumulator, key) => 
                        {
                            if (ALLOW_ROOM_FIELDS.find(field => field == key)) {
                                accumulator[key] = item[key]
                            }
                            return accumulator
                        }, 
                        {}
                    )
        return res
    }

    /*
    *   Set initial values:
    *   - isFavorited flag is set if room is found in userFavoriteRooms array.
    *   - store state userFavoriteRooms is mapped to this component's props
    *   - filter necessary fields
    */
    getHandledRoomList = (roomResults) => {
        const list = roomResults.map(e => {
            if (this.state.rooms.find(room => room._id == e._id)) {
                return
            }

            let isFavorited = false

            let res = this.filterAllowFields(e)

            if (this.props.userFavoriteRooms && this.props.userFavoriteRooms.length) {
                isFavorited = this.props.userFavoriteRooms.findIndex(favRoom => e._id == favRoom) != -1
            }
            return Object.assign(
                res, 
                {
                    isFavorited, 
                    roomFullAddress: this.roomFullAddress(e),
                    roomType: this.roomType(e),
                    roomPrice: this.roomPrice(e)
                }
            )
        })
        return list
    }

    getRoomList = async () => {
        if (this.state.reachLastPage || this.state.lastFetchedPage == this.state.currentPage) {
            return
        }

        this.setState(prevState => ({lastFetchedPage: prevState.lastFetchedPage + 1}))

        try {
            const pagination = {
                page: this.state.currentPage,
                limit: this.state.DEFAULT_PAGINATION_LIMIT
            }
            const res = await roomServices.getRoomList(pagination)
            let roomResults = res.data.data.posts

            if (!roomResults.length) {
                this.setState({reachLastPage: true})
                return
            }

            roomResults = this.getHandledRoomList(roomResults)

            this.setState(prevState => (
                    {
                        rooms: [...prevState.rooms, ...roomResults], 
                        currentPage: prevState.currentPage + 1
                    }
                )
            )
        } catch (error) {
            if (error.response) {
                this.props.setError(error.response.data.message)
            }
        }
    }

    componentDidMount() {
        this.getRoomList()
    }

    render () {
        return (
            <View style={mainStyles.containerWithoutHeader}>
                <RoomListOptionBar
                    errorMessage={this.state.errorMessage}
                    getDefaultList={this.getDefaultList}
                    openFilterModal={this.openFilterModal}
                />
                <RoomList
                    rooms={this.state.rooms}
                    getRoomList={this.getRoomList}
                    setError={this.setError}
                    setRooms={this.setRooms}
                />
                <RoomFilterModal
                    modalVisible={this.state.modalVisible}
                    closeFilterModal={this.closeFilterModal}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    userFavoriteRooms: state.userFavoriteRooms,
})

export default connect(mapStateToProps)(RoomListScreen)