import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import config from '../../config';
import { getCurrentCity } from '../../actions/http';

export default class CityLoctionComponent extends Component {

    static propTypes = {
        handlePress: PropTypes.func
    }

    state = {
        regeocode: {}
    };

    componentWillMount() {
        // this.getCurrentPosition();
    }

    getCurrentPosition() {
        try {
            navigator.geolocation.getCurrentPosition((location) => {
                const { longitude, latitude } = location.coords;

                getCurrentCity({
                    params: {
                        key: config.key,
                        location: `${longitude},${latitude}`
                    },
                    callback: ({ regeocode }) => {
                        this.setState({
                            regeocode
                        });
                    }
                });
            });
        } catch (e) {
            console.warn(e);
        }
    }

    handlePress(Name) {
        const { handlePress } = this.props;

        handlePress && handlePress({ Name });
    }

    render() {
        const { width } = Dimensions.get('window'),
            { addressComponent = {} } = this.state.regeocode,
            { province = '' } = addressComponent,
            cityName = province.replace(/市/g, '');

        if (cityName === '') { 
            return null; 
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.handlePress(cityName)}
                >
                    <View style={[
                        styles.city_item,
                        {
                            width: (width - 30) * 0.43
                        }
                    ]}>
                        <Text
                            style={styles.city_txt}
                        >
                            {cityName}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'container': {
        paddingTop: scaleSize(6),
        paddingBottom: scaleSize(6),
        paddingLeft: scaleSize(15),
        paddingRight: scaleSize(15),
        backgroundColor: '#FFF'
    },
    'city_item': {
        height: scaleSize(35),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#dedfe0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    'city_txt': {
        fontSize: setSpText(14),
        color: '#2d2d2d'
    }
});
