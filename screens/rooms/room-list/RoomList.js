import React from 'react'
import { SafeAreaView, FlatList, Text } from 'react-native'
import { connect } from 'react-redux'

import { addFavRoom, delFavRoom } from '../../../store/actions/roomActions'
import RoomListItem from './RoomListItem'
import roomServices from '../../../api/services/roomServices'

import mainStyles from '../../../styles/mainStyles'
import itemStyles from '../../../styles/roomStyles/roomListStyles'

class RoomList extends React.Component {
    renderItem = ({ item }) => {
        return (<RoomListItem item={item} onToggleFavorite={this.onToggleFavorite} navigation={this.props.navigation} />)
    }

    toggleFavorited = (roomId) => {
        const room = this.props.rooms.find(e => e._id == roomId)
        room.isFavorited = !room.isFavorited

        this.props.setRooms(this.props.rooms.map(e => e._id != roomId ? e : room))
    }

    onToggleFavorite = (item) => {
        if (!this.props.isLoggedIn) {
            this.props.navigation.navigate('User')
            return
        }

        if (this.props.user.role != 'renter') {
            return
        }

        const roomId = item._id

        const isFavorited = item.isFavorited

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

            this.toggleFavorited(roomId)
        } catch (error) {
            console.log(error.response ? error.response.data : error)
            if (error.response) {
                this.props.setError(error.response.data.message)
            }
        }
    }

    onRemoveFavoriteRoom = async (roomId) => {
        try {
            const data = await roomServices.removeFavoriteRoom({ post_id: roomId })

            this.props.delFavRoom({ roomId })

            this.toggleFavorited(roomId)
        } catch (error) {
            console.log(error.response ? error.response.data : error)
            if (error.response) {
                this.props.setError(error.response.data.message)
            }
        }
    }

    render() {
        return (
            <SafeAreaView style={[mainStyles.container, itemStyles.roomList]}>
                <FlatList
                    horizontal={true}
                    data={this.props.rooms}
                    renderItem={this.renderItem}
                    keyExtractor={(room) => room._id}
                    onEndReachedThreshold={0.5}
                    onEndReached={this.props.onLoadMoreRooms}
                />
            </SafeAreaView>
        )
    }
}
const mapStateToProps = state => ({
    isLoggedIn: state.userReducer.isLoggedIn,
    userFavoriteRooms: state.roomReducer.userFavoriteRooms,
    user: state.userReducer.user
})

const mapActionsToProps = {
    addFavRoom,
    delFavRoom
}

export default connect(mapStateToProps, mapActionsToProps)(RoomList)