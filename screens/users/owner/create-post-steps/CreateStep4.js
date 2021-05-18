import React from "react";
import { View, Text, ScrollView, Button, TouchableOpacity } from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

import CheckboxList from "../../../rooms/CheckboxList";

import { ROOM_FACILITIES_BY_GROUP } from "../../../../consts/consts";

import mainStyles from "../../../../styles/mainStyles";
import modalStyles from "../../../../styles/roomStyles/roomFilterModalStyles";
import stepStyles from "../../../../styles/roomStyles/createPostStyles";

import { defaultColor } from "../../../../styles/constStyles";

class CreateStep4 extends React.Component {
  state = {
    shareHouse: null,
    bathroom: null,
    heater: null,
    kitchen: null,
    aircond: null,
    balcony: null,
    bill: null,
    others: [],
  };

  addOtherServices = (value, fac) => {
    if (value) {
      this.setState((prevState) => ({ others: [...prevState.others, fac] }));
    } else {
      this.setState((prevState) => ({
        others: prevState.others.filter((e) => e != fac),
      }));
    }
  };

  handleServices = () => {
    const services = Object.values(this.state).reduce((accumulator, value) => {
      if (Array.isArray(value)) return [...accumulator, ...value];
      return [...accumulator, value];
    }, []);
    this.props.onGoToNextStep({ services });
  };

  validForm = () => {
    const valid = Object.values(this.state)
                  .reduce((accumulator, value) => {
                    if (Array.isArray(value)) return accumulator
                    return accumulator && value
                  }, true)
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
          <Text style={modalStyles.filterLabel}>Bước 4</Text>
        </TouchableOpacity>

        {!this.props.visible ? null : (
          <View style={[modalStyles.modalView, stepStyles.viewContainer]}>
            <Text style={modalStyles.filterLabel}>Chung chủ</Text>
            <View style={mainStyles.leftmost}>
            <RadioForm
              radio_props={ROOM_FACILITIES_BY_GROUP.shareHouse}
              initial={-1}
              buttonColor={defaultColor.primary}
              onPress={(shareHouse) => {
                this.setState({ shareHouse });
              }}
            />
            </View>

            <Text style={modalStyles.filterLabel}>Phòng tắm</Text>
            <View style={mainStyles.leftmost}>
            <RadioForm
              radio_props={ROOM_FACILITIES_BY_GROUP.bathroom}
              initial={-1}
              buttonColor={defaultColor.primary}
              onPress={(bathroom) => {
                this.setState({ bathroom });
              }}
            />
            </View>

            <Text style={modalStyles.filterLabel}>Nóng lạnh</Text>
            <View style={mainStyles.leftmost}>
            <RadioForm
              radio_props={ROOM_FACILITIES_BY_GROUP.heater}
              initial={-1}
              buttonColor={defaultColor.primary}
              onPress={(heater) => {
                this.setState({ heater });
              }}
            />
            </View>

            <Text style={modalStyles.filterLabel}>Phòng bếp</Text>
            <View style={mainStyles.leftmost}>
            <RadioForm
              radio_props={ROOM_FACILITIES_BY_GROUP.kitchen}
              initial={-1}
              buttonColor={defaultColor.primary}
              onPress={(kitchen) => {
                this.setState({ kitchen });
              }}
            />
            </View>

            <Text style={modalStyles.filterLabel}>Điều hòa</Text>
            <View style={mainStyles.leftmost}>
            <RadioForm
              radio_props={ROOM_FACILITIES_BY_GROUP.aircond}
              initial={-1}
              buttonColor={defaultColor.primary}
              onPress={(aircond) => {
                this.setState({ aircond });
              }}
            />
            </View>

            <Text style={modalStyles.filterLabel}>Ban công</Text>
            <View style={mainStyles.leftmost}>
            <RadioForm
              radio_props={ROOM_FACILITIES_BY_GROUP.balcony}
              initial={-1}
              buttonColor={defaultColor.primary}
              onPress={(balcony) => {
                this.setState({ balcony });
              }}
            />
            </View>

            <Text style={modalStyles.filterLabel}>Điện nước</Text>
            <View style={mainStyles.leftmost}>
            <RadioForm
              radio_props={ROOM_FACILITIES_BY_GROUP.bill}
              initial={-1}
              buttonColor={defaultColor.primary}
              onPress={(bill) => {
                this.setState({ bill });
              }}
            />
            </View>

            <Text style={modalStyles.filterLabel}>Tiện ích khác</Text>
            <CheckboxList
              items={ROOM_FACILITIES_BY_GROUP.others}
              addValue={this.addOtherServices}
            />

            <View style={stepStyles.confirmButton}>
              <Button
                onPress={this.handleServices}
                disabled={!this.validForm()}
                title="Ghi nhận và tiếp tục"
                color={defaultColor.primary}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default CreateStep4;
