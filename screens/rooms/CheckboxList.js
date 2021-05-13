import React from "react";
import { View, Text, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { defaultColor } from '../../styles/constStyles'

import mainStyles from '../../styles/mainStyles'
import modalStyles from '../../styles/roomFilterModalStyles'

class CheckboxItem extends React.PureComponent {
    state = {
        checked: false
    }

    render () {
        return (
            <View style={mainStyles.horizontalContainer}>
                <CheckBox
                    onFillColor={defaultColor.primary}
                    value={this.state.checked}
                    onValueChange={value => {
                        this.setState(prevState => ({checked: !prevState.checked}))
                        this.props.addValue(value, this.props.item.id)
                    }}
                />
                <Text>{this.props.item.name}</Text>
            </View>
        )
    }
}

class RoomRangeSlider extends React.PureComponent {
  render() {
    return (
        <ScrollView style={[mainStyles.leftmost, modalStyles.selector]}>
            {this.props.items.map(e => (<CheckboxItem key={e.id} item={e} addValue={this.props.addValue}/>))}
        </ScrollView>
    );
  }
}

export default RoomRangeSlider;
