import React from 'react'
import { View } from 'react-native'
import {connect} from 'react-redux'

import RoomListOptionBar from './RoomListOptionBar'
import RoomList from './RoomList'

import roomServices from '../../api/services/roomServices'

import mainStyles from '../../styles/mainStyles'

class RoomListScreen extends React.Component {
    state = {
        rooms: [],
        currentPage: 1,
        totalPage: 1,
        errorMessage: '',
        DEFAULT_PAGINATION_LIMIT: 3,
    }

    resetSettings = () => {
        this.setState({
            currentPage: 1,
            totalPage: 1,
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

    openFilter = () => {

    }

    /*
    *   RoomList function
    */
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
                    openFilter={this.openFilter}
                />
                <RoomList
                    rooms={this.state.rooms}
                    getRoomList={this.getRoomList}
                    setError={this.setError}
                    setRooms={this.setRooms}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    userFavoriteRooms: state.userFavoriteRooms,
})

export default connect(mapStateToProps)(RoomListScreen)