import React from 'react'
import { Text, View } from 'react-native'

const UserFavorScreen = (props) => {
    itemList = props.route.params.list;
    const abc = []
    for(let i =0; i < itemList.length; i++) {
        abc.push(<Text key={i}> {itemList[i]}</Text>)
    }
    return (
        <View>
            {abc}
        </View>
    )
}

export default UserFavorScreen