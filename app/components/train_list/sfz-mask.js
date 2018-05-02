import React, { Component } from 'react';
import {
    View,
    Image,
    Modal,
    Dimensions,
    TouchableOpacity
} from 'react-native';

export default class SfzMaskComponent extends Component {

    state = {
        modalVisible: false
    }

    render() {
        const { height } = Dimensions.get('window');
        const { modalVisible } = this.state;        

        return (
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose ={() => {}}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,.8)',
                        alignItems: 'center'
                    }}
                >
                    <Image 
                        source={require('../../images/identity_guide.png')}
                        style={{
                            width: scaleSize(228),
                            height: scaleSize(272),
                            marginTop: scaleSize(height * 0.1)
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            requestAnimationFrame(() => {
                                this.setState({ modalVisible: false });
                            });
                        }}
                    >
                        <Image 
                            source={require('../../images/Iknow.png')}
                            style={{
                                width: scaleSize(115),
                                height: scaleSize(50),
                                marginTop: scaleSize(height * 0.2)
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}
