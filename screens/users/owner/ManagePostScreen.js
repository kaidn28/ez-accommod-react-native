import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import 'intl';
import 'intl/locale-data/jsonp/vi';

import ManagePostList from './ManagePostList';

import roomServices from '../../../api/services/roomServices';

import mainStyles from '../../../styles/mainStyles';

import {
  ROOM_TYPES,
  CITIES,
  HANOI_DISTRICTS,
  HANOI_WARDS,
} from '../../../consts/consts';

const defaultRoom = {
  roomTypes: ROOM_TYPES,
  cities: CITIES,
  hanoiDistricts: HANOI_DISTRICTS,
  hanoiWards: HANOI_WARDS,
};

const ALLOW_ROOM_FIELDS = [
  '_id',
  'images',
  'rooms',
  'authenticate',
  'status',
  'type',
  'saved',
  'expiredAt',
  'postPrice'
];

class ManagePostListScreen extends React.Component {
  state = {
    rooms: [],
    currentPage: 1,
    lastFetchedPage: 0,
    reachLastPage: false,
    loading: false,
    errorMessage: '',
    DEFAULT_PAGINATION_LIMIT: 5,
  };

  resetSettings = (func) => {
    this.setState(
      {
        rooms: [],
        currentPage: 1,
        lastFetchedPage: 0,
        reachLastPage: false,
        errorMessage: '',
      },
      func
    );
  };

  setError = (err) => {
    this.setState({ errorMessage: err });
  };

  setRooms = (newRooms) => {
    this.setState({ rooms: newRooms });
  };

  getDefaultList = () => {
    this.resetSettings(() => this.getRoomList());
  };

  /*
   *   ROOMLIST FUNCTIONS
   */

  /*
   *   Get string address from int array
   */
  roomFullAddress = (item) => {
    const findCity = defaultRoom.cities.find((e) => e.id == item.address.city);
    const findDistrict = defaultRoom.hanoiDistricts.find(
      (e) => e.id == item.address.district
    );
    const findWard = defaultRoom.hanoiWards.find(
      (e) => e.id == item.address.ward
    );

    const city = findCity ? findCity.name : '';
    const district = findDistrict ? findDistrict.name : '';
    const ward = findWard ? findWard.name : '';
    const road = item.address.road;

    return `${road}, ${ward}, ${district}, ${city}`;
  };

  roomType = (item) => {
    return defaultRoom.roomTypes.find((e) => e.id == item.type).name || '';
  };

  postPrice = (item) => {
    return new Intl.NumberFormat('vi-VN').format(
      item.postPrice.replace(/\D/g, '')
    );
  };

  roomLike = (item) => {
    return String(item.save)
  };

  roomAuthenticate = (item) => {
    if (item.authenticate) {
      return 'true';
    } else {
      return 'false';
    }
  };

  expiredDate = (item) => {
    var date = new Date(item.expiredAt);
    // console.log(date.toLocaleDateString())
    return date.toLocaleDateString()
  }

  /*
   *   Filter fields to reduce data size
   */
  filterAllowFields = (item) => {
    const res = Object.keys(item).reduce((accumulator, key) => {
      if (ALLOW_ROOM_FIELDS.find((field) => field == key)) {
        accumulator[key] = item[key];
      }
      return accumulator;
    }, {});
    return res;
  };

  /*
   *   Set initial values:
   *   - isFavorited flag is set if room is found in userFavoriteRooms array.
   *   - store state userFavoriteRooms is mapped to this component's props
   *   - filter necessary fields
   */
  getHandledRoomList = (roomResults) => {
    if (!roomResults.length) return roomResults;

    const list = roomResults.map((e) => {
      if (this.state.rooms.find((room) => room._id == e._id)) {
        return;
      }

      let res = this.filterAllowFields(e);

      return Object.assign(res, {
        roomFullAddress: this.roomFullAddress(e),
        roomType: this.roomType(e),
        postPrice: this.postPrice(e),
        roomLike: this.roomLike(e),
        roomAuthenticate: this.roomAuthenticate(e),
        expiredDate: this.expiredDate(e)
      });
    });

    return list;
  };

  getRoomList = async () => {
    if (
      this.state.reachLastPage ||
      this.state.lastFetchedPage == this.state.currentPage
    ) {
      return;
    }

    this.setState((prevState) => ({
      lastFetchedPage: prevState.lastFetchedPage + 1,
      loading: true,
    }));

    try {
      const pagination = {
        page: this.state.currentPage,
        limit: this.state.DEFAULT_PAGINATION_LIMIT,
      };
      const res = await roomServices.getOwnerRooms(pagination);
      let roomResults = res.data.data.posts;

      if (!roomResults.length) {
        this.setState({ reachLastPage: true });
        return;
      }


      roomResults = this.getHandledRoomList(roomResults);

      this.setState((prevState) => ({
        rooms: [...prevState.rooms, ...roomResults],
        currentPage: prevState.currentPage + 1,
      }));

    } catch (error) {
      if (error.response) {
        this.props.setError(error.response.data.message);
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.getRoomList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoggedIn != this.props.isLoggedIn) {
      this.getRoomList();
    }
  }

  render() {
    return (
      <View style={mainStyles.containerWithHeader}>
        {this.state.rooms.length || this.state.loading ? null : (
          <Text style={[mainStyles.warning, mainStyles.boldText]}>
            Không có dữ liệu
          </Text>
        )}
        {!this.state.loading || this.state.rooms.length ? null : (
          <Text style={[mainStyles.boldText]}>Đang tải dữ liệu</Text>
        )}
        <ManagePostList
          rooms={this.state.rooms}
          getRoomList={this.getRoomList}
          setError={this.setError}
          setRooms={this.setRooms}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(ManagePostListScreen);
