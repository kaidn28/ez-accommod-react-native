import React from 'react'
import mainStyles from '../../../styles/mainStyles'
import itemStyles from '../../../styles/roomStyles/roomListStyles'
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native'
import roomServices from '../../../api/services/roomServices'

class RoomDetailsScreen extends React.Component {
    id = this.props.route.params.id
    // use this id to fetch detail
    onRoomDetail = async (id) => {
        try {
            console.log(id)
            const data = await roomServices.getRoomDetail({ post_id: id })
            console.log(data)
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }
    componentDidMount() {
        this.onRoomDetail(this.id)
    }
    render() {
        console.log(id)
        return (
            <ScrollView>
                <Image
                    source={{
                        uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
                    }}
                    style={{ width: 200, height: 200 }}
                />
                <View>
                    <Text>Thông tin chung</Text>
                    <View style={itemStyles.container}>
                        <View style={mainStyles.horizontalContainer}>
                            <Text style={styles.item}>Họ tên chủ trọ:</Text>
                            <Text>Nguyen Tran</Text>
                        </View>
                        <View style={mainStyles.horizontalContainer}>
                            <Text style={styles.item}>Số điện thoại liên lạc:</Text>
                            <Text>0338335441</Text>
                        </View>
                        <View style={mainStyles.horizontalContainer}>
                            <Text style={styles.item}>Kiểu phòng cho thuê:</Text>
                            <Text>Phòng trọ</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text>Chi tiết loại phòng</Text>
                    <View style={itemStyles.container}>
                        <View style={itemStyles.facilityContainer}>
                            <Text style={styles.item}>Diện tích</Text>
                            <Text>50 m2</Text>
                        </View>
                        <View style={itemStyles.facilityContainer}>
                            <Text style={styles.item}>Số phòng cho thuê</Text>
                            <Text> 4 phòng</Text>
                        </View>
                        <View style={itemStyles.facilityContainer}>
                            <Text style={styles.item}>Địa chỉ</Text>
                            <Text>123, Chương Dương, Hoàn Kiếm, Hà Nội
                                Landmark</Text>
                        </View>
                        <View style={itemStyles.facilityContainer}>
                            <Text style={styles.item}>Cơ sở vật chất</Text>
                            <Text>Chung chủ</Text>
                            <Text>Phòng tắm khép kín</Text>
                            <Text>Có nóng lạnh</Text>
                            <Text>Khu bếp riêng</Text>
                            <Text>Có điều hòa</Text>
                            <Text>Có ban công</Text>
                            <Text> Điện nước giá dân</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text>Giá thuê</Text>
                    <Text style={itemStyles.price}>10.000.000 đồng/tháng</Text>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    item: {
        fontWeight: 'bold'
    }
})


export default RoomDetailsScreen