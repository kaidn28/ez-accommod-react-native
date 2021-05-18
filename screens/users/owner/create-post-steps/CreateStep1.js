import React from "react";
import { View, Text, ScrollView, Button, TouchableOpacity } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { connect } from "react-redux";

import {
  DEFAULT_TIME_FRAME,
  DEFAULT_POST_PRICE,
} from "../../../../consts/consts";

import mainStyles from "../../../../styles/mainStyles";
import modalStyles from "../../../../styles/roomStyles/roomFilterModalStyles";
import stepStyles from "../../../../styles/roomStyles/createPostStyles";

import { defaultColor } from "../../../../styles/constStyles";

class CreateStep1 extends React.Component {
  state = {
    timeFrame: 0,
    postPrice: "",
    expiredAt: "",
  };

  getUserFullname = () => {
    return `${this.props.user.firstName} ${this.props.user.lastName}`;
  };

  getUserPhone = () => {
    return this.props.user.phoneNumber;
  };

  setTimeFrame = (time) => {
    this.setState({ timeFrame: time.days });
    this.getExpiredTime(time.days)
    this.getPostPrice(time.days);
  };

  getPostPrice = (timeFrame) => {
    const findPostPrice = DEFAULT_POST_PRICE.find((e) => e.days == timeFrame);
    if (!findPostPrice) {
      this.setState({ timeFrame: 0 });
    } else {
      this.setState({ postPrice: findPostPrice.price });
    }
  };

  getExpiredTime = (timeFrame) => {
    let createdAt = null;
    if (this.props.hasExistedPost) {
      createdAt = new Date(this.post.createdAt);
    } else {
      createdAt = new Date();
    }
    const expiredAt = this.addDays(
      createdAt,
      timeFrame
    ).toISOString();
    this.setState({ expiredAt: this.formatISOdate(expiredAt.split("T")[0]) });
  };

  addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  formatISOdate = (date) => {
    if (!date) return null;

    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  setExistedPost = () => {
    this.setState({
      timeFrame: this.props.form.timeFrame,
      postPrice: this.props.form.postPrice,
      expiredAt: formatISOdate(this.props.form.expiredAt.split("T")[0]),
    });
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
          <Text style={modalStyles.filterLabel}>Bước 1</Text>
        </TouchableOpacity>

        {
          !this.props.visible ?
          null :
          (
            <View style={[modalStyles.modalView, stepStyles.viewContainer]}>
              <Text style={modalStyles.filterLabel}>Họ tên chủ trọ</Text>
              <Text style={stepStyles.readOnlyText}>{this.getUserFullname()}</Text>
    
              <Text style={modalStyles.filterLabel}>Số điện thoại liên lạc</Text>
              <Text style={stepStyles.readOnlyText}>{this.getUserPhone()}</Text>
    
              <Text style={modalStyles.filterLabel}>
                Thời gian hiển thị bài đăng
              </Text>
              <Text style={mainStyles.reminder}>Trường bắt buộc</Text>
              <ModalSelector
                style={modalStyles.selector}
                data={DEFAULT_TIME_FRAME}
                keyExtractor={(item) => item.id}
                labelExtractor={(item) => item.name}
                initValue="Chọn thời gian"
                onChange={(time) => this.setTimeFrame(time)}
              />
    
              <Text style={modalStyles.filterLabel}>Ngày hết hạn</Text>
              <Text style={stepStyles.readOnlyText}>{this.state.expiredAt}</Text>
    
              <Text style={modalStyles.filterLabel}>Phí hiển thị bài đăng</Text>
              <Text style={stepStyles.readOnlyText}>{this.state.postPrice}</Text>
    
              <View style={stepStyles.confirmButton}>
                <Button
                  onPress={() => this.props.onGoToNextStep(this.state)}
                  disabled={!this.state.timeFrame}
                  title="Ghi nhận và tiếp tục"
                  color={defaultColor.primary}
                />
              </View>
            </View>  
          )
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(CreateStep1);
