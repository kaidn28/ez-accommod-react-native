import React from "react";
import { View, Text, ScrollView, Button } from "react-native";
import Modal from "react-native-modal";
import ModalSelector from "react-native-modal-selector";

import RangeSlider from "./RangeSlider";
import CheckboxList from "./CheckboxList";

import modalStyles from "../../styles/roomFilterModalStyles";

import {
  CITIES,
  HANOI_DISTRICTS,
  HANOI_WARDS,
  ROOM_TYPES,
  ROOM_FACILITIES,
} from "../../consts/consts";
import { defaultColor } from "../../styles/constStyles";

class RoomFilterModal extends React.Component {
  state = {
    city: "",
    district: "",
    ward: "",
    price: [500, 7000],
    type: [],
    area: [0, 200],
    services: [],
    defaultInfo: {
      cities: CITIES,
      hanoiDistricts: HANOI_DISTRICTS,
      hanoiWards: HANOI_WARDS,
    },
  };

  setCity = (newCity) => {
    this.setState({ city: newCity.id });
  };

  setDistrict = (newDistrict) => {
    this.setState({ district: newDistrict.id });
    this.state.defaultInfo.hanoiWards = HANOI_WARDS.filter(
      (e) => e.district == newDistrict.id
    );
  };

  setWard = (newWard) => {
    this.setState({ ward: newWard.id });
  };

  setPriceRange = (min, max) => {
    this.setState({ price: [min, max] });
  };

  addRoomType = (value, type) => {
    if (value) {
      this.setState((prevState) => ({ type: [...prevState.type, type] }));
    } else {
      this.setState((prevState) => ({
        type: prevState.type.filter((e) => e != type),
      }));
    }
  };

  setAreaRange = (min, max) => {
    this.setState({ area: [min, max] });
  };

  addService = (value, fac) => {
    if (value) {
      this.setState((prevState) => ({ services: [...prevState.services, fac] }));
    } else {
      this.setState((prevState) => ({
        services: prevState.services.filter((e) => e != fac),
      }));
    }
  };

  onApplyFilter = () => {
    console.log(this.state.services);
    this.props.closeFilterModal();
  };

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
            <Text style={modalStyles.filterLabel}>Vị trí</Text>
            <ModalSelector
              style={modalStyles.selector}
              data={this.state.defaultInfo.cities}
              keyExtractor={(item) => item.id}
              labelExtractor={(item) => item.name}
              initValue="Chọn thành phố"
              onChange={(city) => this.setCity(city)}
            />
            <ModalSelector
              style={modalStyles.selector}
              data={this.state.defaultInfo.hanoiDistricts}
              keyExtractor={(item) => item.id}
              labelExtractor={(item) => item.name}
              initValue="Chọn quận"
              onChange={(district) => this.setDistrict(district)}
            />
            <ModalSelector
              style={modalStyles.selector}
              data={this.state.defaultInfo.hanoiWards}
              keyExtractor={(item) => item.id}
              labelExtractor={(item) => item.name}
              initValue="Chọn phường"
              onChange={(ward) => this.setWard(ward)}
            />

            <Text style={modalStyles.filterLabel}>
              Giá thuê/tháng (nghìn đồng)
            </Text>
            <RangeSlider
              min={500}
              max={4500}
              step={100}
              setRange={this.setPriceRange}
            />

            <Text style={modalStyles.filterLabel}>Loại phòng</Text>
            <CheckboxList items={ROOM_TYPES} addValue={this.addRoomType} />

            <Text style={modalStyles.filterLabel}>Diện tích</Text>
            <RangeSlider
              min={0}
              max={200}
              step={10}
              setRange={this.setAreaRange}
            />

            <Text style={modalStyles.filterLabel}>Cơ sở vật chất</Text>
            <CheckboxList items={ROOM_FACILITIES} addValue={this.addService} />

            <View>
              <Button
                onPress={this.onApplyFilter}
                title="Tìm kiếm"
                color={defaultColor.primary}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

export default RoomFilterModal;
