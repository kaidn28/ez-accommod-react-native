import React from "react";
import { Text, View, Button, ScrollView } from "react-native";
import mainStyles from "../../../styles/mainStyles";
import stepStyles from '../../../styles/roomStyles/createPostStyles'

import CreateStep1 from "./create-post-steps/CreateStep1";
import CreateStep2 from "./create-post-steps/CreateStep2";
import CreateStep3 from "./create-post-steps/CreateStep3";
import CreateStep4 from "./create-post-steps/CreateStep4";

class CreatePostScreen extends React.Component {
  state = {
    step1Visible: true,
    step2Visible: false,
    step3Visible: false,
    step4Visible: false,
    step5Visible: false,
    step1Valid: false,
    step2Valid: false,
    step3Valid: false,
    step4Valid: false,
    step5Valid: false,
    form: {
      address: {
        city: null,
        district: null,
        ward: null,
        road: null,
        addressDetail: null,
      },
      expiredAt: null,
      type: null,
      rooms: [],
      postPrice: null,
      images: [],
    },
    room: {
      number: null,
      price: null,
      area: null,
      services: [],
    },
  };

  emptyForm = () => {
    this.setState({
      form: {
        address: {
          city: null,
          district: null,
          ward: null,
          road: null,
          addressDetail: null,
        },
        expiredAt: null,
        type: null,
        rooms: [],
        postPrice: null,
      },
    });
  };

  closeStep1 = () => {
    this.emptyForm();
  };

  // Update form from step 1 and open step 2 modal
  goToStep2 = (form) => {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        expiredAt: form.expiredAt,
        postPrice: form.postPrice,
      },
      step1Visible: false,
      step2Visible: true,
      step1Valid: true
    }));
  };

  closeStep2 = () => {
    this.setState({ step1Visible: true, step2Visible: false });
  };

  // Update form from step 2 and open step 3 modal
  goToStep3 = (form) => {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        address: {
          city: form.city,
          district: form.district,
          ward: form.ward,
          road: form.road,
          addressDetail: form.addressDetail,
        },
        type: form.type,
      },
      step2Visible: false,
      step3Visible: true,
      step2Valid: true
    }));
  };

  closeStep3 = () => {
    this.setState({ step2Visible: true, step3Visible: false });
  };

  // Update form from step 3 and open step 4 modal
  goToStep4 = (form) => {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        images: form.images,
      },
      step3Visible: false,
      step4Visible: true,
      step3Valid: true
    }));
  };

  closeStep4 = () => {
    this.setState({ step5Visible: true, step4Visible: false });
  };

  // Update form from step 4 and open step 5 modal
  goToStep5 = (form) => {
    this.setState((prevState) => ({
      room: {
        ...prevState.room,
        services: form.services
      },
      step4Visible: false,
      step5Visible: true,
      step4Valid: true
    }));
  };

  toggleStep = (step) => {
    switch (step) {
      case 1:
        this.setState((prevState) => ({
          step1Visible: !prevState.step1Visible,
        }));
        break;
      case 2:
        // if (!this.state.step1Valid) return
        this.setState((prevState) => ({
          step2Visible: !prevState.step2Visible,
        }));
        break;
      case 3:
        // if (!this.state.step2Valid) return
        this.setState((prevState) => ({
          step3Visible: !prevState.step3Visible,
        }));
        break;
      case 4:
          // if (!this.state.step2Valid) return
          this.setState((prevState) => ({
            step4Visible: !prevState.step4Visible,
          }));
          break;
    }
  };

  render() {
    return (
      <View style={stepStyles.container}>
        <ScrollView>
          <CreateStep1
            visible={this.state.step1Visible}
            toggleStep={() => this.toggleStep(1)}
            onGoToNextStep={this.goToStep2}
            form={null}
            hasExistedPost={false}
          />
          <CreateStep2
            visible={this.state.step2Visible}
            toggleStep={() => this.toggleStep(2)}
            onGoToNextStep={this.goToStep3}
            form={null}
            hasExistedPost={false}
          />
          <CreateStep3
            visible={this.state.step3Visible}
            toggleStep={() => this.toggleStep(3)}
            onGoToNextStep={this.goToStep4}
            form={null}
            hasExistedPost={false}
          />
          <CreateStep4
            visible={this.state.step4Visible}
            toggleStep={() => this.toggleStep(4)}
            onGoToNextStep={this.goToStep5}
            form={null}
            hasExistedPost={false}
          />
        </ScrollView>
      </View>
    );
  }
}

export default CreatePostScreen;
