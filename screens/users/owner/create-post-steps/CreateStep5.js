import React from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";

import 'intl'
import 'intl/locale-data/jsonp/vi'

import mainStyles from "../../../../styles/mainStyles";
import modalStyles from "../../../../styles/roomStyles/roomFilterModalStyles";
import stepStyles from "../../../../styles/roomStyles/createPostStyles";

import { defaultColor } from "../../../../styles/constStyles";

class CreateStep5 extends React.Component {
  state = {
      price: null,
      number: null,
      area: null
  };

  setPrice = (price) => {
      this.setState({price: new Intl.NumberFormat('vi-VN').format(price.replace(/\D/g, ''))})
  }

  setNumber = (number) => {
      this.setState({number})
  }

  setArea = (area) => {
      this.setState({area})
  }

  validForm = () => {
      const valid = Object.values(this.state)
                    .reduce((accumulator, value) => accumulator && value, true)
    return valid
  }

  setExistedPost = () => {
    this.setState({});
  };

  componentDidMount() {
    if (this.props.hasExistedPost) {
      this.setExistedPost();
    }
  }

  render() {
    return (
      <View style={stepStyles.stepContainer}>
        <TouchableOpacity
          style={[stepStyles.titlebox, mainStyles.centerContainer]}
          onPress={this.props.toggleStep}
        >
          <Text style={modalStyles.filterLabel}>Bước 5</Text>
        </TouchableOpacity>

        {!this.props.visible ? null : (
          <View style={[modalStyles.modalView, stepStyles.viewContainer]}>
            <Text style={modalStyles.filterLabel}>Giá phòng/tháng</Text>
            <Text style={mainStyles.reminder}>Trường bắt buộc</Text>
            <TextInput 
                    style={stepStyles.inputContainer}
                    onChangeText={this.setPrice}
                    value={this.state.price}
                    placeholder='Giá cho thuê (VNĐ)'
                    keyboardType='numeric'
            />

            <Text style={modalStyles.filterLabel}>Số lượng phòng</Text>
            <Text style={mainStyles.reminder}>Trường bắt buộc</Text>
            <TextInput 
                    style={stepStyles.inputContainer}
                    onChangeText={this.setNumber}
                    value={this.state.number}
                    placeholder='Số phòng có thể cho thuê'
                    keyboardType='numeric'
            />

            <Text style={modalStyles.filterLabel}>Diện tích</Text>
            <Text style={mainStyles.reminder}>Trường bắt buộc</Text>
            <TextInput 
                    style={stepStyles.inputContainer}
                    onChangeText={this.setArea}
                    value={this.state.area}
                    placeholder='Diện tích phòng (m2)'
                    keyboardType='numeric'
            />

            <View style={stepStyles.confirmButton}>
              <Button
                onPress={() => this.props.onGoToNextStep(this.state)}
                disabled={!this.validForm()}
                title="Đăng bài viết"
                color={defaultColor.primary}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default CreateStep5;
