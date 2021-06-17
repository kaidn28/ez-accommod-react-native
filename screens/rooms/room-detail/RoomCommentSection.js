import React from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import Modal from "react-native-modal";

import modalStyles from "../../../styles/roomStyles/roomFilterModalStyles";

import { defaultColor } from "../../../styles/constStyles";
import mainStyles from "../../../styles/mainStyles";

class RoomCommentSection extends React.Component {
  state = {
    title: "",
    content: "",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.commentLoading) {
      this.setState({ title: "", content: "" });
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
          <ScrollView>
            <View style={mainStyles.container}>
              <Text style={modalStyles.filterLabel}>Đánh giá phòng trọ</Text>
              <TextInput
                style={[
                  mainStyles.textInput,
                  mainStyles.leftmost,
                  { marginLeft: 10, marginRight: 10, marginBottom: 10 },
                ]}
                onChangeText={(title) => this.setState({ title })}
                defaultValue={this.state.title}
                placeholder="Nhập tiêu đề                                                                                               "
              />
              <TextInput
                style={[
                  mainStyles.textInput,
                  mainStyles.leftmost,
                  {
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10,
                    marginTop: 5,
                  },
                ]}
                onChangeText={(content) => this.setState({ content })}
                defaultValue={this.state.content}
                placeholder="Nhập đánh giá"
              />

              <View>
                <Button
                  disabled={!this.state.title && !this.state.content}
                  onPress={() =>
                    this.props.onSubmitReview({
                      title: this.state.title,
                      content: this.state.content,
                    })
                  }
                  title={
                    this.props.commentLoading
                      ? "Đang gửi đánh giá..."
                      : "Đánh giá"
                  }
                  color={defaultColor.primary}
                />
              </View>

              <Text style={[{ marginTop: 15 }, modalStyles.filterLabel]}>
                {this.props.items.length
                  ? "Bình luận"
                  : "Hiện không có bình luận về phòng"}
              </Text>

              {!this.props.items.length
                ? null
                : this.props.items.map((item) => (
                    <View
                      style={{
                        marginTop: 3,
                        marginBottom: 10,
                        borderColor: defaultColor.dark,
                        borderWidth: 1,
                        width: "100%",
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderRadius: 5,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <Text style={{ marginBottom: 3, fontWeight: "bold" }}>
                        {item.title}
                      </Text>
                      <Text>{item.content}</Text>
                    </View>
                  ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

export default RoomCommentSection;
