import React from 'react'
import { View, Text } from 'react-native'
import {connect} from 'react-redux'

import 'intl'
import 'intl/locale-data/jsonp/vi'

import RoomListOptionBar from '../../rooms/room-list/RoomListOptionBar'
import RoomList from '../../rooms/room-list/RoomList'
import RoomFilterModal from '../../rooms/room-list/RoomFilterModal'

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

class UserFavorScreen extends React.Component {
    state = {
        rooms: [],
        modalVisible: false,
        filter: false,
        loading: false,
        errorMessage: '',
    }

    resetSettings = (func) => {
        this.setState({
            rooms: [],
            errorMessage: '',
            filter: false
        }, func)
    }

    setError = (err) => {
        this.setState({errorMessage: err})
    }

    setRooms = (newRooms) => {
        this.setState({rooms: newRooms})
    }

    getDefaultList = () => {
        this.resetSettings(() => this.getRoomList())
    }

    openFilterModal = () => {
        this.setState({modalVisible: true})
    }

    closeFilterModal = () => {
        this.setState({modalVisible: false})
    }

    /*
    *   FILTER ROOMS FUNCTIONS
    */
    filerRooms = (item) => {
        this.resetSettings()  
        this.getFilteredRooms(item)
    }

    getFilteredRooms = async (item) => {
        this.applyFilter(item)
        
        try {
            const res = await roomServices.filterRooms(item)
            let roomResults = res.data.data.posts

            roomResults = this.getHandledRoomList(roomResults)

            this.setState({ rooms: roomResults })
        } catch (error) {
            if (error.response) {
                this.props.setError(error.response.data.message)
            }
        } finally {
            this.setState({loading: false})
        }
    }

    applyFilter = (item) => {
        this.setState({filter: true, loading: true})
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
        if (!roomResults.length || !this.props.userFavoriteRooms.length) return []

        const list = roomResults
                    .filter(e => this.props.userFavoriteRooms.find(favRoomId => favRoomId == e._id))
                    .map(e => {
                        if (this.state.rooms.find(room => room._id == e._id)) {
                            return
                        }

                        let res = this.filterAllowFields(e)

                        return Object.assign(
                            res, 
                            {
                                isFavorited: true, 
                                roomFullAddress: this.roomFullAddress(e),
                                roomType: this.roomType(e),
                                roomPrice: this.roomPrice(e)
                            }
                        )
                    })
        return list
    }

    getRoomList = async () => {
        this.setState(({ loading: true }))

        try {
            const res = await roomServices.getRoomList()
            let roomResults = res.data.data.posts

            if (!roomResults.length) {
                return
            }

            roomResults = this.getHandledRoomList(roomResults)

            this.setState(prevState => (
                    {
                        rooms: [...prevState.rooms, ...roomResults]
                    }
                )
            )
        } catch (error) {
            if (error.response) {
                this.props.setError(error.response.data.message)
            }
        } finally {
            this.setState({loading: false})
        }
    }

    componentDidMount() {
        this.getRoomList()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isLoggedIn != this.props.isLoggedIn) {
            const rooms = this.getHandledRoomList(this.state.rooms)
            this.setState({rooms})
        }
    }

    render () {
        return (
            <View style={mainStyles.containerWithHeader}>
                <RoomListOptionBar
                    errorMessage={this.state.errorMessage}
                    getDefaultList={this.getDefaultList}
                    openFilterModal={this.openFilterModal}
                />
                {this.state.rooms.length || this.state.loading ? null : (<Text style={[mainStyles.warning, mainStyles.boldText]}>Không có dữ liệu</Text>)}
                {!this.state.loading ? null : (<Text style={[mainStyles.boldText]}>Đang tải dữ liệu</Text>)}
                <RoomList
                    rooms={this.state.rooms}
                    getRoomList={this.getRoomList}
                    setError={this.setError}
                    setRooms={this.setRooms}
                    onLoadMoreRooms={() => {}}
                    navigation={this.props.navigation}
                />
                <RoomFilterModal
                    modalVisible={this.state.modalVisible}
                    closeFilterModal={this.closeFilterModal}
                    applyFilter={this.filerRooms}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    userFavoriteRooms: state.roomReducer.userFavoriteRooms,
    isLoggedIn: state.userReducer.isLoggedIn
})

export default connect(mapStateToProps)(UserFavorScreen)