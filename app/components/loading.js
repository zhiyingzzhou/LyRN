import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Platform
} from 'react-native';

// import Spinner from 'react-native-spinkit';

export default class LoadingComponent extends Component {
    render() {
        const { width, height } = Dimensions.get('window');
        
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={[
                    styles.toast,
                    {
                        width,
                        height: Platform.OS === 'ios' ? height : height - StatusBar.currentHeight,
                    }
                ]}
            >
                <View
                    style={{
                        backgroundColor: 'rgba(17, 17, 17, 0.7)',
                        alignItems: 'center',
                        width: width * 0.3,
                        height: width * 0.3,
                        marginTop: -(width * 0.3),
                        borderRadius: width * 0.02
                    }}
                >
                    {/* <Spinner style={styles.spinner} isVisible={true} size={30} type="ChasingDots" color="#FFFFFF" /> */}
                    <Image 
                        source={require('../images/Spinner.gif')}
                        style={{
                            width: 38,
                            height: 38,
                            marginTop: width * 0.06
                        }}
                    />
                    <Text style={{
                        fontSize: setSpText(14),
                        color: '#FFF',
                        marginTop: width * 0.03
                    }}>加载中...</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
