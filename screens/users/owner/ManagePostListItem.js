import React from 'react'
import { View, Text, Image, TouchableOpacity, Switch, Alert, Button } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {defaultColor} from '../../../styles/constStyles'
import itemStyles from '../../../styles/roomStyles/roomListStyles'
import mainStyles from '../../../styles/mainStyles'

import RoomFacilityList from '../../rooms/room-list/RoomFacilityList'
import roomServices from '../../../api/services/roomServices'


// import { defaultColor, defaultBorder } from '../../../styles/constStyles'


class ManagePostList extends React.Component {
    state = {
      active: true
    }
    getImage = () => {
        if (this.props.item.images[0]) return {uri: this.props.item.images[0]}
        return require('../../../assets/room01.jpg')
    }

    setActive = (item) => {
      if ( item.status === 'active') {
        return
      }
      else {
        this.setState({active: !this.state.active})
        return 
      }
    }

    toogleActive = async () => {
      const _id = this.props.item._id;
      try {
        await roomServices.toggleActivePost({_id});
        this.setState({toggleActive: !(this.state.toogleActive)})
      }
      catch(err){
        console.log(err.response)
      }
    }

    getColor = () => {
      if(this.props.item.authenticate) {
        return '#53d86a'
      }
      else {
        return '#cfcfcf'
      }
    }

    getPostStatus = () => {
      if(this.props.item.authenticate) {
        return false
      }
      else {
        return true
      }
    }

    renderEdit = () => {
      if (!this.props.item.authenticate) {
        return (
          <View style={{width: '100%', flex:2,flexDirection:"row",justifyContent:'space-between',flexWrap: "wrap"}}>
            <Text style={itemStyles.roomType}>
              Chỉnh sửa
            </Text>
            <TouchableOpacity style={{borderRadius: 10,width:40, height: 40, backgroundColor: '#f6dddf', alignContent: 'center', justifyContent: 'center'}}
            onPress={() => {
            this.props.navigation.navigate('EditPost', {post: this.props.item})
            }}>
              <Ionicons name="construct" size={30} style={{paddingleft: 5, marginLeft: 5}}></Ionicons>
            </TouchableOpacity>
          </View>

        )
      }
      else {
        return
      }
    }
    

    componentDidMount() {
      console.log(this.state.toggleActive)
      this.setActive(this.props.item);
    }

    render () {
        return (
            <View style={{
        borderColor: '#687a80',
        borderRadius: 10,
        borderWidth: 0.5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        margin: 10,
        backgroundColor: '#fff',
        width: 350
    }}>
                <View style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10
                }}>
                    <Image 
                        style={ {
                            height: 150,
                            width: 250
                        }} 
                        source={this.getImage()}
                        resizeMode="contain"
                    />
                </View>
                <View style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'flex-start',
          alignContent: 'space-between',
          justifyContent: 'space-between'
        }}>
                <TouchableOpacity
                    disabled={this.getPostStatus()}
                    onPress={() => this.props.navigation.navigate('Details', {id: this.props.item._id})}
                >
                    

                    <View style={{ width: '100%',flex:2,flexDirection:"row",justifyContent:'space-between',flexWrap: "wrap"}}>
                      <Text style={{...itemStyles.roomType, width: '50%'}}>
                        Loại Phòng
                      </Text>
                        <Text style={{fontSize: 20}}>{this.props.item.roomType}</Text>
                    </View>

                    <View style={{width: '100%', flex:2,flexDirection:"row",justifyContent:'space-between',flexWrap: "wrap"}}>
                      <Text style={itemStyles.roomType}>
                        Yêu Thích
                      </Text>
                        <Text style={{fontSize: 20}}>{this.props.item.saved}</Text>
                    </View>

                    <View style={{width: '100%', flex:2,flexDirection:"row",justifyContent:'space-between',flexWrap: "wrap"}}>
                      <Text style={itemStyles.roomType}>
                        Trạng thái duyệt
                      </Text>
                        
                        <TouchableOpacity
                            disabled={true}
                            style={{
                                borderWidth:0,
                                width:30,
                                height:30,
                                backgroundColor: `${this.getColor()}`,
                                borderRadius:50,
                                paddingBottom: 30
                              }}
                          />
                    </View>

                     <View style={{width: '100%', flex:2,flexDirection:"row",justifyContent:'space-between',flexWrap: "wrap"}}>
                      <Text style={itemStyles.roomType}>
                        Hết hạn vào
                      </Text>
                        <Text style={{fontSize: 20}}>{this.props.item.expiredDate}</Text>
                      </View>
                
        
                    <View style={{width: '100%', flex:2,flexDirection:"row",justifyContent:'space-between',flexWrap: "wrap"}}>
                      <Text style={itemStyles.roomType}>
                        Giá
                      </Text>
                        <Text style={{fontSize: 20}}>{this.props.item.postPrice} đồng</Text>
                    </View>

                   {this.renderEdit()}

                    <View style={{width: '100%', flex:2,flexDirection:"row",justifyContent:'space-between',flexWrap: "wrap"}}>
                      <Text style={itemStyles.roomType}>
                        Trạng thái cho thuê
                      </Text>
                         <Switch
                          trackColor={{  false: "#cfcfcf", true: "#f6dddf"  }}
                          thumbColor={this.state.active ? "#df9c9d" : "#f4f3f4"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={this.toggleActive}
                          value={this.state.active}
                        />
                    </View>

                 

                </TouchableOpacity>
                   
                </View>
            </View>
        )    
    }
}

export default ManagePostList