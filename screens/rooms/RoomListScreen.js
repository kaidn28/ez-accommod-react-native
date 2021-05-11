import React from 'react'
import { SafeAreaView , FlatList, Text } from 'react-native'
import {connect} from 'react-redux'

import { addFavRoom, delFavRoom } from '../../store/actions'

import RoomListItem from './RoomListItem'
import roomServices from '../../api/services/roomServices'

import mainStyles from '../../styles/mainStyles'

class RoomListScreen extends React.Component {
    state = {
        rooms: [],
        errorMessage: '',
        currentPage: 1,
        totalPage: 1,
        DEFAULT_PAGINATION_LIMIT: 3
    }

    renderItem = ({item}) => {
        return (<RoomListItem item={item} onToggleFavorite={this.onToggleFavorite} />)
    }

    resetError = () => {
        this.setState({errorMessage: ''})
    }

    toggleFavorited = (roomId, status) => {
        const room = this.state.rooms.find(e => e._id == roomId)
        if (room.isFavorited) {
            room.isFavorited = !room.isFavorited
        } else {
            room.isFavorited = status
        }

        this.setState(prevState => ({
            rooms: prevState.rooms.map(e => e._id != roomId ? e : room)
        }))

    }

    getRoomList = async () => {
        try {
            const pagination = {
                page: this.state.currentPage,
                limit: this.state.DEFAULT_PAGINATION_LIMIT
            }
            const res = await roomServices.getRoomList(pagination)
            let roomResults = res.data.data.posts

            /*
            *   Set initial isFavorited boolean value:
            *   - isFavorited flag is set if room is found in userFavoriteRooms array.
            *   - store state userFavoriteRooms is mapped to this component's props
            */
            roomResults = roomResults.map(e => {
                let isFavorited = false
                if (this.props.userFavoriteRooms && this.props.userFavoriteRooms.length) {
                    isFavorited = this.props.userFavoriteRooms.findIndex(favRoom => e._id == favRoom) != -1
                }
                return Object.assign(e, {isFavorited})
            })

            this.setState(prevState => (
                    {
                        rooms: [...prevState.rooms, ...roomResults], 
                        currentPage: prevState.currentPage + 1
                    }
                )
            )
        } catch (error) {
            this.setState({errorMessage: error.response.data.message})
        }
    }

    /*
    *   Handle whether it should add new favorite room or delete existed one.
    *   Nested navigators caused errors. 
    *   Gonna fix that later. Now I left that commented out. 
    */
    onToggleFavorite = (item) => {
        if (!this.props.isLoggedIn) {
            // this.props.navigation.navigate('User', { screen: 'Login' })
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
            console.log(error)
            if (error.response) {
                this.setState({errorMessage: error.response.data.message})
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
                this.setState({errorMessage: error.response.data.message})
            }
        }
    }

    componentDidMount() {
        this.getRoomList()
    }

    render () {
        return (
            <SafeAreaView style={mainStyles.container}>
                {!this.state.errorMessage ? 
                    null : 
                    <Text style={mainStyles.error}></Text>
                }
                <FlatList
                    horizontal={true}
                    data={this.state.rooms}
                    renderItem={this.renderItem}
                    keyExtractor={(room) => room._id}
                    onEndReachedThreshold={0.7}
                    onEndReached={() => {}}
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

export default connect(mapStateToProps, mapActionsToProps)(RoomListScreen)