import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { defaultColor } from "../../styles/constStyles";
import itemStyles from "../../styles/roomListStyles";
import mainStyles from "../../styles/mainStyles";

class RoomListOptionBar extends React.Component {
  render() {
    return (
      <View style={itemStyles.optionBar}>
        {!this.props.errorMessage ? null : (
          <Text style={mainStyles.error}></Text>
        )}

        <View style={itemStyles.optionBarToolSet}>
          <TouchableOpacity
            style={[mainStyles.centerContainer, itemStyles.icon]}
            onPress={this.props.getDefaultList}
          >
            <Ionicons name="list-outline" size={30} color={defaultColor.dark} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[mainStyles.centerContainer, itemStyles.icon]}
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
