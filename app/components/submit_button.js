import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Dimensions
} from 'react-native';

export default class SubmitButtonComponent extends Component {

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.array
        ]),
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number
        ])
    }

    render() {
        const { width } = Dimensions.get('window');
        const { style } = this.props;
        
        return (
            <View style={[
                { 
                    position: 'absolute',
                    bottom: 0,
                    height: scaleSize(50),
                    backgroundColor: '#3C6',
                    width,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                style
            ]}>
                {this.props.children}
            </View>
        );
    }
}
