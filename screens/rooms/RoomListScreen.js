import React from 'react'
import { SafeAreaView , FlatList } from 'react-native'

import RoomListItem from './RoomListItem'
import roomServices from '../../api/services/roomServices'

class RoomListScreen extends React.Component {
    state = {
        rooms: [],
        currentPage: 1,
        totalPage: 1,
        DEFAULT_PAGINATION_LIMIT: 1
    }

    renderItem = ({item}) => {
        return (<RoomListItem item={item} />)
    }

    getRoomList = async () => {
        try {
            const pagination = {
                page: this.state.currentPage,
                limit: this.state.DEFAULT_PAGINATION_LIMIT
            }
            const res = await roomServices.getRoomList(pagination)
            const roomResults = res.data.data.posts
            this.setState(prevState => (
                    {
                        rooms: [...prevState.rooms, ...roomResults], 
                        currentPage: prevState.currentPage + 1
                    }
                )
            )
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getRoomList()
    }

    render () {
        return (
            <SafeAreaView>
                <FlatList
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

export default RoomListScreen