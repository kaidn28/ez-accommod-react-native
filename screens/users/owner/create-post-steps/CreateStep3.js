import React, { useState, useEffect } from "react";
import { View, Text, Button, Platform, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import mainStyles from "../../../../styles/mainStyles";
import modalStyles from "../../../../styles/roomStyles/roomFilterModalStyles";
import stepStyles from '../../../../styles/roomStyles/createPostStyles'

import {defaultColor} from '../../../../styles/constStyles'

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

    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    if (!result.cancelled) {
      setImages(prevArray => [...prevArray, {uri: localUri, name: filename, type}]);
    }
  };

  const validForm = () => {
      return !!images.length
  }

  const setExistedPost = () => {
  }
    
  return (
        <View style={stepStyles.stepContainer}>
          <TouchableOpacity 
            style={stepStyles.titlebox}
            onPress={props.toggleStep}
          >
            <Text style={modalStyles.filterLabel}>Bước 3</Text>
          </TouchableOpacity>

          {
            !props.visible ?
            null :
            (
              <View style={[modalStyles.modalView, stepStyles.viewContainer]}>
                <Text style={modalStyles.filterLabel}>Chọn ảnh khái quát về phòng cho thuê</Text>
                <View style={mainStyles.container}>
                <Button color={defaultColor.secondary} title="Chọn ảnh" onPress={pickImage} />
                {images.map((image, index) => (
                    <Image key={index} source={{ uri: image.uri }} style={stepStyles.previewImg} />
                ))}
                </View>
                
                <View style={stepStyles.confirmButton}>
                  <Button
                    onPress={() => props.onGoToNextStep({images})}
                    disabled={!validForm()}
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

export default CreateStep3
