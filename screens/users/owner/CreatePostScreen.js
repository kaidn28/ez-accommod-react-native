import React from 'react'
import {Text, View, Button} from 'react-native'

import CreateStep1 from './create-post-steps/CreateStep1'
import CreateStep2 from './create-post-steps/CreateStep2'

class CreatePostScreen extends React.Component {
    state = {
        step1Visible: true,
        step2Visible: false,
        step3Visible: false,
        form: {
            address: {
              city: null,
              district: null,
              ward: null,
              road: null,
              addressDetail: null,
            },
            expiredAt: null,
            type: null,
            rooms: [],
            postPrice: null
        },
    }

    emptyForm = () => {
        this.setState({
            form: {
                address: {
                  city: null,
                  district: null,
                  ward: null,
                  road: null,
                  addressDetail: null,
                },
                expiredAt: null,
                type: null,
                rooms: [],
                postPrice: null
            },
        })
    }

    closeStep1 = () => {
        this.emptyForm()
    }

    // Update form from step 1 and open step 2 modal
    goToStep2 = (form) => {
        this.setState(prevState => ({
            form: {
                ...prevState.form,
                expiredAt: form.expiredAt,
                postPrice: form.postPrice
            },
            step1Visible: false,
            step2Visible: true
        }))
    }

    closeStep2 = () => {
        this.setState({step1Visible: true, step2Visible: false})
    }

    // Update form from step 2 and open step 3 modal
    goToStep3 = (form) => {
        this.setState(prevState => ({
            form: {
                ...prevState.form,
                address: {
                    city: form.city,
                    district: form.district,
                    ward: form.ward,
                    road: form.road,
                    addressDetail: form.addressDetail,
                },
                type: form.type
            },
            step2Visible: false,
            step3Visible: true
        }))
    }

    render () {
        return (
            <View>
                <Text>Create Post Screen</Text>
                <CreateStep1 
                    modalVisible={this.state.step1Visible}
                    closeFilterModal={this.closeStep1}
                    onGoToNextStep={this.goToStep2}
                    form={}
                    hasExistedPost={false}
                />
                <CreateStep2
                    modalVisible={this.state.step2Visible}
                    closeFilterModal={this.closeStep2}
                    onGoToNextStep={this.goToStep3}
                    form={}
                    hasExistedPost={false}
                />
            </View>
        )
    }
}

export default CreatePostScreen