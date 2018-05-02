import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class CheckboxComponent extends Component {
    static propTypes = {
        title: PropTypes.oneOfType([
            PropTypes.element, 
            PropTypes.string
        ]),
        activeOpacity: PropTypes.number,
        onChange: PropTypes.func,
        name: PropTypes.string
    }

    state = {
        checked: false
    }

    checkboxMap = {
        false: require('../../images/checkbox.png'),
        true: require('../../images/checkbox_active.png')
    }

    handleCheckbox = () => {
        const { onChange, name = '' } = this.props;

        this.setState({
            checked: !this.state.checked
        });

        if (onChange && name !== '') {
            onChange(name, !this.state.checked);
        }
    }

    render() {
        const { checked } = this.state;
        const { title = '', activeOpacity = 0.6 } = this.props;
        
        return (
            <TouchableOpacity
                activeOpacity={activeOpacity}
                onPress={this.handleCheckbox}
            >
                <View style={styles.checkbox_item}>
                    <Text style={styles.checkbox_txt}>{title}</Text>
                    <Image 
                        style={styles.checkbox_image} 
                        source={this.checkboxMap[checked]} 
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    'checkbox_item': {
        flexDirection: 'row',
        alignItems: 'center'
    },
    'checkbox_txt': {
        fontSize: setSpText(14),
        lineHeight: scaleSize(14),
        color: '#2d2d2d',
    },
    'checkbox_image': {
        width: scaleSize(18),
        height: scaleSize(18),
        marginLeft: scaleSize(3)
    }
});
