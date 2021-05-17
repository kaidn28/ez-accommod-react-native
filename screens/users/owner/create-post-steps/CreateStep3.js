import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button, Platform, Image } from "react-native";
import Modal from "react-native-modal";

import mainStyles from "../../../styles/mainStyles";
import modalStyles from "../../../styles/roomStyles/roomFilterModalStyles";
import stepStyles from '../../../../styles/roomStyles/createPostStyles'

const CreateStep3 = (props) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (props.hasExistedPost) {
        setExistedPost()
    }

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImages(prevArray => [...prevArray, result.uri]);
    }
  };

  const validForm = () => {
      return !!images.length
  }

  const setExistedPost = () => {
  }
    
  return (
      <Modal
        isVisible={props.modalVisible}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        onBackdropPress={props.closeFilterModal}
        onBackButtonPress={props.closeFilterModal}
      >
        <ScrollView>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.filterLabel}>Chọn ảnh khái quát về phòng cho thuê</Text>
            <View style={mainStyles.container}>
            <Button title="Chọn ảnh" onPress={pickImage} />
            {images.map(image => (
                <Image source={{ uri: image }} style={stepStyles.previewImg} />
            ))}
            </View>
            
            <View>
              <Button
                onPress={props.onGoToNextStep({images})}
                disabled={validForm()}
                title="Tiếp tục"
                color={defaultColor.primary}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
}

export default CreateStep3
