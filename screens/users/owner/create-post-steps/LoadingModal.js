import React from 'react'
import { View, Text } from 'react-native'
import Modal from "react-native-modal";

import mainStyles from '../../../../styles/mainStyles'
import modalStyles from '../../../../styles/roomStyles/roomFilterModalStyles'
import stepStyles from '../../../../styles/roomStyles/createPostStyles'

class LoadingModal extends React.PureComponent {
    render () {
        return (
            <Modal
                isVisible={this.props.modalVisible}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                <View style={modalStyles.modalView}>
                {!this.props.errorMessage || this.props.loading ? null : (<Text style={[mainStyles.error]}>{this.props.errorMessage}</Text>)}
                {!this.props.loading ? null : (<Text style={[mainStyles.boldText]}>Đang đăng bài viết...</Text>)}
                {!this.props.loading && !this.props.errorMessage ? (<Text style={[mainStyles.boldText]}>Đã thành công</Text>) : null}
                </View>
            </Modal>
        )
    }
}

export default LoadingModal