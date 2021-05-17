import React from "react";
import { View, Text, ScrollView, Button, TextInput } from "react-native";
import Modal from "react-native-modal";
import ModalSelector from "react-native-modal-selector";
import {connect} from 'react-redux'

import { CITIES, HANOI_DISTRICTS, HANOI_WARDS, ROOM_TYPES } from '../../../../consts/consts'

import mainStyles from "../../../styles/mainStyles";
import modalStyles from "../../../styles/roomStyles/roomFilterModalStyles";
import stepStyles from '../../../../styles/roomStyles/createPostStyles'

class CreateStep1 extends React.Component {
  state = {
      city: null,
      district: null,
      ward: null,
      road: null,
      detailAddress: null,
      type: null,
      defaultInfo: {
          hanoiWards: []
      }
  };

  setCity = (newCity) => {
    this.setState({ city: newCity.id });
  };

  setDistrict = (newDistrict) => {
    this.setState({ 
        district: newDistrict.id,
        defaultInfo: {
            hanoiWards: HANOI_WARDS.filter((e) => e.district == newDistrict.id)
        }
    });
  };

  setWard = (newWard) => {
    this.setState({ ward: newWard.id });
  };

  setRoad = (road) => {
    this.setState({road})
  }

  setDetailAddress = (detailAddress) => {
    this.setState({detailAddress})
  }

  setType = (type) => {
    this.setState({type})
  }

  getHandledData = () => {
    const res = Object.keys(this.state).reduce((accumulator, key) => {
      if (key == 'defaultInfo') return accumulator
      return Object.assign(accumulator, { key: this.state[key] })
    }, {})
    
    return res
  }

  setExistedPost = () => {
      this.setState({
      })
  }

  componentDidMount () {
      if (this.props.hasExistedPost) {
          this.setExistedPost()
      }
  }

  render() {
    return (
      <Modal
        isVisible={this.props.modalVisible}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        onBackdropPress={this.props.closeFilterModal}
        onBackButtonPress={this.props.closeFilterModal}
      >
        <ScrollView>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.filterLabel}>Tỉnh/thành phố</Text>
            <Text style={mainStyles.reminder}>Trường bắt buộc</Text>
            <ModalSelector
              style={modalStyles.selector}
              data={CITIES}
              keyExtractor={(item) => item.id}
              labelExtractor={(item) => item.name}
              initValue="Hà Nội"
              onChange={(city) => this.setCity(city)}
            />

            <Text style={modalStyles.filterLabel}>Quận/huyện/thị xã</Text>
            <Text style={mainStyles.reminder}>Trường bắt buộc</Text>
            <ModalSelector
              style={modalStyles.selector}
              data={HANOI_DISTRICTS}
              keyExtractor={(item) => item.id}
              labelExtractor={(item) => item.name}
              initValue="Hoàn Kiếm"
              onChange={(district) => this.setDistrict(district)}
            />

            <Text style={modalStyles.filterLabel}>Phường</Text>
            <Text style={mainStyles.reminder}>Trường bắt buộc</Text>
            <ModalSelector
              style={modalStyles.selector}
              data={this.state.defaultInfo.hanoiWards}
              keyExtractor={(item) => item.id}
              labelExtractor={(item) => item.name}
              initValue="Trần Hưng Đạo"
              onChange={(ward) => this.setWard(ward)}
            />

            <Text style={modalStyles.filterLabel}>Địa chỉ cụ thể</Text>
            <Text style={mainStyles.reminder}>Trường bắt buộc</Text>
            <TextInput 
                styles={stepStyles.input}
                onChangeText={this.setRoad}
                value={this.state.road}
                placeholder='Số 30 Trần Hưng Đạo'
            />

            <Text style={modalStyles.filterLabel}>Miêu tả địa chỉ</Text>
            <TextInput 
                styles={stepStyles.input}
                onChangeText={this.setDetailAddress}
                value={this.state.detailAddress}
                placeholder='Cà phê Tự Do'
            />

            <Text style={modalStyles.filterLabel}>Loại phòng</Text>
            <Text style={mainStyles.reminder}>Trường bắt buộc</Text>
            <ModalSelector
              style={modalStyles.selector}
              data={ROOM_TYPES}
              keyExtractor={(item) => item.id}
              labelExtractor={(item) => item.name}
              initValue="Chung cư mini"
              onChange={(type) => this.setType(type)}
            />
            
            <View>
              <Button
                onPress={this.props.onGoToNextStep(this.getHandledData())}
                disabled={!!this.state.timeFrame}
                title="Tiếp tục"
                color={defaultColor.primary}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
    user: state.userReducer.user,
})

export default connect(mapStateToProps)(CreateStep1)
