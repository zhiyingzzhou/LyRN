import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

export default class CityListBlock extends Component {

    static defaultProps = {
        data: []
    }

    static propTypes = {
        data: PropTypes.array,
        handlePress: PropTypes.func
    }

    handlePress = (data) => {
        const { handlePress } = this.props;

        handlePress && handlePress(data); // eslint-disable-line
    }

    /**
     * 渲染每一块
     * @param {array} data 
     * @param {number} index 
     */

    _renderItem = (data, index) => {
        return (
            <TouchableOpacity
                key={index}
                style={[
                    styles.item,
                    {
                        marginTop: index < 3 ? 0 : this.itemGutter,
                        marginLeft: index % 3 === 0 ? this.gutter : this.itemGutter,
                        width: this.itemWidth
                    }
                ]}
                onPress={() => {
                    this.handlePress(data); 
                }}
            >
                <Text style={styles.txt}>{data.Name}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { width } = Dimensions.get('window');
        const { data } = this.props;

        this.gutter = width * 0.1 / 2;
        this.innerWidth = width * 0.9;
        this.itemWidth = this.innerWidth * 0.3;
        this.itemGutter = this.innerWidth * 0.05;

        return (
            <View style={[
                styles.container,
                {
                    paddingTop: this.gutter,
                    paddingBottom: this.gutter
                }
            ]}>
                {data.map(this._renderItem)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'container': {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    'item': {
        height: scaleSize(35),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#dedfe0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    'txt': {
        fontSize: setSpText(14),
        color: '#2d2d2d'
    }
});
