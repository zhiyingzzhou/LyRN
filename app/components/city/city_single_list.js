import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

export default class CityListComponent extends Component {

    static propTypes = {
        data: PropTypes.array,
        handlePress: PropTypes.func,
        cityListUpdate: PropTypes.func
    }
    
    shouldComponentUpdate(nextProps) {
        return this.props.data !== nextProps.data;
    }

    componentDidUpdate() {
        this.props.data.length > 0 && this.props.cityListUpdate();
    }

    handlePress = (data) => {
        const { handlePress } = this.props;

        InteractionManager.runAfterInteractions(() => {
            handlePress && handlePress(data);
        });
    }

    _renderRow(data) {
        return (
            data.map((item, index) =>
                <TouchableOpacity
                    style={styles.row}
                    key={index}
                    onPress={() => {
                        this.handlePress(item); 
                    }}
                >
                    <Text style={styles.txt}>{item.Name}</Text>
                </TouchableOpacity>
            )
        );
    }

    render() {
        const { data } = this.props;

        if (data.length === 0) {
            return null;
        }
        
        return (
            <View style={styles.container}>
                {data.length > 0 ? this._renderRow(data) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'container': {
        paddingLeft: scaleSize(15),
        paddingRight: scaleSize(15),
        backgroundColor: '#FFF'
    },
    'row': {
        height: scaleSize(35),
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#eee'
    },
    'txt': {
        fontSize: setSpText(14),
        color: '#2d2d2d',
    }
});
