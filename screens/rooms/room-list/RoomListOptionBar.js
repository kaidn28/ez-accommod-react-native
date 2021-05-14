import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { defaultColor } from "../../../styles/constStyles";
import optionBarStyles from "../../../styles/roomStyles/optionBarStyles";
import mainStyles from "../../../styles/mainStyles";

class RoomListOptionBar extends React.Component {
  render() {
    return (
      <View style={optionBarStyles.optionBar}>
        {!this.props.errorMessage ? null : (
          <Text style={mainStyles.error}></Text>
        )}

        <View style={optionBarStyles.optionBarToolSet}>
          <TouchableOpacity
            style={[mainStyles.centerContainer, optionBarStyles.icon]}
            onPress={this.props.getDefaultList}
          >
            <Ionicons name="refresh-outline" size={30} color={defaultColor.dark} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[mainStyles.centerContainer, optionBarStyles.icon]}
            onPress={this.props.openFilterModal}
          >
            <Ionicons
              name="filter-outline"
              size={30}
              color={defaultColor.dark}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default RoomListOptionBar;
