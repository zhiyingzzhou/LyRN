import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
    StatusBar,
    Platform
} from 'react-native';

export default class LoadingComponent extends Component {

    render() {
        const { width, height } = Dimensions.get('window');

        return (
            <View style={{
                position: 'absolute',
                width,
                height: Platform.OS === 'ios' ? height : height - StatusBar.currentHeight,
                top: 0,
                left: 0,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image
                    source={require('../../images/gif-loading.gif')}
                    style={{
                        width: scaleSize(150),
                        height: scaleSize(150),
                        marginTop: -scaleSize(75)
                    }}
                />
            </View>
        );
    }
}
