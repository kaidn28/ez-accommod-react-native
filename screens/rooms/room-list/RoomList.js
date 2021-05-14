import React from 'react'
import { SafeAreaView , FlatList, Text } from 'react-native'
import {connect} from 'react-redux'

import {addFavRoom, delFavRoom} from '../../../store/actions/roomActions'
import RoomListItem from './RoomListItem'
import roomServices from '../../../api/services/roomServices'

import mainStyles from '../../../styles/mainStyles'
import itemStyles from '../../../styles/roomStyles/roomListStyles'

class RoomList extends React.Component {
    renderItem = ({item}) => {
        return (<RoomListItem item={item} onToggleFavorite={this.onToggleFavorite} />)
    }

    toggleFavorited = (roomId, status) => {
        const room = this.props.rooms.find(e => e._id == roomId)
        if (room.isFavorited) {
            room.isFavorited = !room.isFavorited
        } else {
            room.isFavorited = status
        }

        this.setRooms(this.props.rooms.map(e => e._id != roomId ? e : room))
    }

    /*
    *   Handle whether it should add new favorite room or delete existed one.
    *   Nested navigators caused errors. 
    *   Gonna fix that later. Now I left that commented out. 
    */
    onToggleFavorite = (item) => {
        if (!this.props.isLoggedIn) {
            this.props.navigation.navigate('User')
            return
        }

        const roomId = item._id

        const isFavorited = item.isFavorited

        if (isFavorited) {
            this.onRemoveFavoriteRoom(roomId)
        } else {
            this.onFavoriteRoom(roomId)
        }
        this.toggleFavorited(roomId, !isFavorited)
    }

    onFavoriteRoom = async (roomId) => {
        try {
            await roomServices.favoriteRoom({ post_id: roomId })
            this.props.addFavRoom({roomId})
        } catch (error) {
            if (error.response) {
                this.props.setError(error.response.data.message)
            }
        }
    }

    onRemoveFavoriteRoom = async (roomId) => {
        try {
            await roomServices.removeFavoriteRoom({ post_id: roomId })
            this.props.delFavRoom({roomId})
        } catch (error) {
            console.log(error)
            if (error.response) {
                this.props.setError(error.response.data.message)
            }
        }
    }

    render () {
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
    isLoggedIn: state.isLoggedIn,
    userFavoriteRooms: state.userFavoriteRooms,
})

const mapActionsToProps = {
    addFavRoom,
    delFavRoom
}

export default connect(mapStateToProps, mapActionsToProps)(RoomList)