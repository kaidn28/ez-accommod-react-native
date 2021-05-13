import React from "react";
import { View, Text } from 'react-native';
import RangeSlider from 'rn-range-slider';

import sliderStyles from '../../styles/sliderStyles'
import modalStyles from '../../styles/roomFilterModalStyles'

const Thumb = () => {
    return (
      <View style={sliderStyles.thumb}/>
    );
  };

  const Rail = () => {
    return (
      <View style={sliderStyles.rail}/>
    );
  };
  
  const RailSelected = () => {
    return (
      <View style={sliderStyles.railSelected}/>
    );
  };

  const Label = ({ text, ...restProps }) => {
    return (
      <View style={sliderStyles.label} {...restProps}>
        <Text style={sliderStyles.labelText}>{text}</Text>
      </View>
    );
  };
  
  const Notch = props => {
    return (
      <View style={sliderStyles.notch} {...props}/>
    );
  };

class RoomRangeSlider extends React.PureComponent {
    renderThumb = () => <Thumb/>
    renderRail = () => <Rail/>
    renderRailSelected = () => <RailSelected/>
    renderLabel = value => <Label text={value}/>
    renderNotch = () => <Notch/>

  render() {
    return (
            <RangeSlider
                style={modalStyles.selector}
                min={this.props.min}
                max={this.props.max}
                step={this.props.step}
                renderThumb={this.renderThumb}
                renderRail={this.renderRail}
                renderRailSelected={this.renderRailSelected}
                renderLabel={this.renderLabel}
                renderNotch={this.renderNotch}
                onValueChanged={this.props.setRange}
            />
    );
  }
}

export default RoomRangeSlider;
