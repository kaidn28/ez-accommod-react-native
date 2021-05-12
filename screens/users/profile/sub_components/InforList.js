import React from 'react'
import {ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Row from './Row'
import PressRow from './PressRow'
const InforList = (props) => {
    //console.log(props)
    // các loại info của user
    const firstName = props.firstName;
    const lastName = props.lastName;
    const email = props.email;
    const id = props.socialID;
    const phoneNumber = props.phoneNumber;
    const role = props.role

    const infors = [firstName, lastName, email, id, phoneNumber, role]
    // Cái này để ghi đằng trước thôi ví dụ `${firstNameString} {firstName}` kiểu z á 
    const firstNameString = 'Tên:'
    const lastNameString = 'Họ:'
    const emailString = 'Email:'
    const idString = 'Số CMND:'
    const phoneNumberString = 'Số điện thoại:'
    const roleString = 'Loại người dùng:'
    const strings = [firstNameString, lastNameString, emailString, idString, phoneNumberString, roleString]
    
    //Các mục infor dẫn đến screen khác
    //Screen
    const favRoomScreen = 'Favor'

    const toScreens = [favRoomScreen]
    //String
    const favRoomString = 'See your favourite rooms'
    
    const pressStrings = [favRoomString]
    // Các loại list
    const favRoomList = props.favoriteRoom
 
    const listList = [favRoomList]
    // in các info thành 1 list
    const inforList = []



    for(let i =0; i < infors.length; i++){
        inforList.push(<Row key={strings[i]} string={strings[i]} info={infors[i]}/>)
    }
    for(let i =0; i < pressStrings.length; i++){
        inforList.push(<PressRow key={pressStrings[i]} string={pressStrings[i]} nav={toScreens[i]} list={listList[i]}></PressRow>)
    }

    return (
        <ScrollView>
            {inforList}
        </ScrollView>
    )
}


export default InforList