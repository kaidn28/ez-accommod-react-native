import React from "react";
import { Text, View, Button, ScrollView } from "react-native";
import mainStyles from "../../../styles/mainStyles";
import stepStyles from "../../../styles/roomStyles/createPostStyles";

import CreateStep1 from "./create-post-steps/CreateStep1";
import CreateStep2 from "./create-post-steps/CreateStep2";
import CreateStep3 from "./create-post-steps/CreateStep3";
import CreateStep4 from "./create-post-steps/CreateStep4";
import CreateStep5 from "./create-post-steps/CreateStep5";
import LoadingModal from './create-post-steps/LoadingModal'

import roomServices from "../../../api/services/roomServices";

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
      postPrice: null,
    },
    timeFrame: null,
    images: [],
    room: {
      number: null,
      price: null,
      area: null,
      services: [],
    },
    errorMessage: null,
    loading: false,
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
      timeFrame: form.timeFrame,
      step1Visible: false,
      step2Visible: true,
      step1Valid: true,
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
      step2Valid: true,
    }));
  };

  closeStep3 = () => {
    this.setState({ step2Visible: true, step3Visible: false });
  };

  // Update form from step 3 and open step 4 modal
  goToStep4 = (form) => {
    this.setState((prevState) => ({
      images: form.images,
      step3Visible: false,
      step4Visible: true,
      step3Valid: true,
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
        services: form.services,
      },
      step4Visible: false,
      step5Visible: true,
      step4Valid: true,
    }));
  };

  handleData = (form, func) => {
    this.setState(
      (prevState) => ({
        room: {
          ...prevState.room,
          price: form.price,
          number: form.number,
          area: form.area,
        },
      }),
      func
    );
  };

  addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  transformData = () => {
    const room = Object.assign({}, this.state.room);
    room.price = room.price.replace(/[.]+/g, '')
    const data = this.state.form;
    data.rooms = [room]

    let createdAt = null;
    if (this.hasExistedPost) {
      // createdAt = new Date(this.post.createdAt);
    } else {
      createdAt = new Date();
    }
    const expiredAt = this.addDays(createdAt, this.state.timeFrame).toISOString();
    data.expiredAt = expiredAt.split("T")[0];

    return data;
  };

  uploadImg = async (img, post_id, index) => {
    const data = new FormData();
    data.append("image", img);

    try {
      const res = await roomServices.uploadImage({
        data, post_id
      });

    } catch (error) {
      console.log(error)
      if (error.response) {
        console.log(error.response.data)
        this.setState({ errorMessage: error.response.data.message });
      }
    } finally {
      if (index == this.state.images.length - 1) {
        this.setState({loading: false})
      }
    }
  };

  createPost = async () => {
    this.setState({loading: true})
    const data = this.transformData()
    try {
      const res = await roomServices.submitPost(data);
      const postId = res.data.data.post._id

      this.state.images.forEach((e, index) => {
        this.uploadImg(e, postId, index)
      })
      this.props.navigation.navigate('ManagePost')
    } catch (error) {
      console.log(error)
      if (error.response) {
        console.log(error.response.data)
        this.setState({ errorMessage: error.response.data.message });
      }
    }
  };

  submitForm = (form) => {
    this.handleData(form, this.createPost);
  };

  toggleStep = (step) => {
    switch (step) {
      case 1:
        this.setState((prevState) => ({
          step1Visible: !prevState.step1Visible,
        }));
        break;
      case 2:
        if (!this.state.step1Valid) return
        this.setState((prevState) => ({
          step2Visible: !prevState.step2Visible,
        }));
        break;
      case 3:
        if (!this.state.step2Valid) return
        this.setState((prevState) => ({
          step3Visible: !prevState.step3Visible,
        }));
        break;
      case 4:
        if (!this.state.step3Valid) return
        this.setState((prevState) => ({
          step4Visible: !prevState.step4Visible,
        }));
        break;
        case 5:
          if (!this.state.step4Valid) return
          this.setState((prevState) => ({
            step5Visible: !prevState.step5Visible,
          }));
          break;
    }
  };

  openLoadingModal = () => {
    return this.state.loading || !!this.state.errorMessage
  }

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
          <CreateStep5
            visible={this.state.step5Visible}
            toggleStep={() => this.toggleStep(5)}
            onGoToNextStep={this.submitForm}
            form={null}
            hasExistedPost={false}
          />
          <LoadingModal 
            modalVisible={this.openLoadingModal()}
            errorMessage={this.state.errorMessage}
            loading={this.state.loading}
          />
        </ScrollView>
      </View>
    );
  }
}

export default CreatePostScreen;
