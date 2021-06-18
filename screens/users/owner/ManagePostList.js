import React from 'react'
import { SafeAreaView , FlatList, Text } from 'react-native'
import {connect} from 'react-redux'

import {addFavRoom, delFavRoom} from '../../../store/actions/roomActions'
import ManagePostListItem from './ManagePostListItem'
import roomServices from '../../../api/services/roomServices'

import mainStyles from '../../../styles/mainStyles'
import itemStyles from '../../../styles/roomStyles/roomListStyles'

class ManagePostList extends React.Component {
    renderItem = ({item}) => {
        return (<ManagePostListItem item={item} onToggleFavorite={this.onToggleFavorite} navigation={this.props.navigation} />)
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
    isLoggedIn: state.userReducer.isLoggedIn,
    userFavoriteRooms: state.roomReducer.userFavoriteRooms,
    user: state.userReducer.user
})

export default connect(mapStateToProps)(ManagePostList)