import React from 'react'
import {ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Row from './Row'
import PressRow from './PressRow'
const InforList = (props) => {
    console.log(props)
    // các loại info của user
    const firstName = props.firstName;
    const lastName = props.lastName;
    const email = props.email;
    const id = props.socialID;
    const phoneNumber = props.phoneNumber;
    const role = props.role

    var infors = [firstName, lastName, email, id, phoneNumber, role]
    // Cái này để ghi đằng trước thôi ví dụ `${firstNameString} {firstName}` kiểu z á 
    const firstNameString = 'Tên:'
    const lastNameString = 'Họ:'
    const emailString = 'Email:'
    const idString = 'Số CMND:'
    const phoneNumberString = 'Số điện thoại:'
    const roleString = 'Loại người dùng:'
    var strings = [firstNameString, lastNameString, emailString, idString, phoneNumberString, roleString]
    
    // in các info thành 1 list
    const inforList = []

    const favRoom = 'See your favourite rooms'
    
    var pressStrings = [favRoom]

    for(let i =0; i < infors.length; i++){
        inforList.push(<Row key={strings[i]} string={strings[i]} info={infors[i]}/>)
    }
    for(let i =0; i < pressStrings.length; i++){
        inforList.push(<PressRow key={pressStrings[i]} string={pressStrings[i]}></PressRow>)
    }

    return (
        <ScrollView
            
        >
            {inforList}
        </ScrollView>
    )
}


export default InforList