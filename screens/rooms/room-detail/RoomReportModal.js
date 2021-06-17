import React from "react";
import { View, Text, ScrollView, Button, TextInput } from "react-native";
import Modal from "react-native-modal";

import CheckboxList from "../CheckboxList";

import modalStyles from "../../../styles/roomStyles/roomFilterModalStyles";

import {
    ROOM_VIOLATIONS
} from "../../../consts/consts";
import { defaultColor } from "../../../styles/constStyles";
import mainStyles from "../../../styles/mainStyles";

class RoomReportModal extends React.Component {
  state = {
      items: [],
      detail: ''
  };

  addViolations = (value, id) => {
    if (value) {
        this.setState((prevState) => ({ items: [...prevState.items, id] }));
      } else {
        this.setState((prevState) => ({
          items: prevState.items.filter((e) => e != id),
        }));
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
          <View style={[modalStyles.modalView]}>
            <Text style={modalStyles.filterLabel}>Lỗi bài đăng</Text>
            <CheckboxList items={ROOM_VIOLATIONS} addValue={this.addViolations} />

            <Text style={modalStyles.filterLabel}>Lỗi khác</Text>
            <TextInput style={[mainStyles.textInput, mainStyles.leftmost, {marginLeft: 10, marginRight: 10, marginBottom: 10}]} 
                onChangeText={(detail) => this.setState({detail})}
                defaultValue={this.state.detail}
                placeholder="Nhập lỗi"
            />

            <View>
              <Button
                disabled={!this.state.items.length && !this.state.detail}
                onPress={() => this.props.onReportRoom({items: this.state.items, detail: this.state.detail})}
                title={this.props.reportLoading ? 'Đang gửi báo cáo...' : "Báo cáo"}
                color={defaultColor.primary}
              />
            </View>
          </View>
      </Modal>
    );
  }
}

export default RoomReportModal;
