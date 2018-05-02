import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';

export default class ButtonComponent extends Component {

    static propTypes = {
        title: PropTypes.string,
        handlePress: PropTypes.func
    }

    shouldComponentUpdate() {
        return false;
    }

    handlePress = () => {
        const { handlePress } = this.props;

        handlePress && handlePress();
    }

    render() {
        const { width } = Dimensions.get('window');
        const { title } = this.props;

        return (
            <View style={{
                alignItems: 'center',
                marginTop: scaleSize(13),
                marginBottom: scaleSize(13)
            }}>
                <TouchableOpacity
                    onPress={this.handlePress}
                >
                    <View
                        style={[
                            styles.button,
                            {
                                width: width * 0.86,
                                position: 'relative'
                            }
                        ]}
                    >
                        <Text style={styles.txt}>{title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'button': {
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleSize(45),
        // marginTop: scaleSize(13),
        // marginBottom: scaleSize(13),
        backgroundColor: '#28c54d',
        borderRadius: 22.5
    },
    'txt': {
        color: '#FFF',
        fontSize: setSpText(18),
        fontWeight: '700'
    }
});
