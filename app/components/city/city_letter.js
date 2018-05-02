import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import letter from './letter';

export default class CityLetterComponent extends Component {

    static propTypes = {
        handlePress: PropTypes.func,
        layout: PropTypes.func,
    }

    blockList = [];
    selectedIndex = '';

    shouldComponentUpdate() {
        return false;
    }

    handlePress(letter, index) { // eslint-disable-line
        if (this.selectedIndex === index) {
            return;
        }
        if (this.selectedIndex !== '') {
            this.blockList[this.selectedIndex].setNativeProps({
                style: {
                    backgroundColor: '#FFF'
                }
            });
        }

        this.blockList[index].setNativeProps({
            style: {
                backgroundColor: '#dedede'
            }
        });

        this.selectedIndex = index;

        const { handlePress } = this.props;

        handlePress && handlePress(letter);
    }

    _renderItem = (letter, index) => { // eslint-disable-line

        return (
            <TouchableOpacity
                ref={(ref) => {
                    this.blockList[index] = ref;
                }}
                style={[
                    styles.item,
                    {
                        marginTop: index < 6 ? 0 : this.innerWidth * 0.05,
                        marginLeft: index % 6 === 0 ? this.gutter : this.innerWidth * 0.05,
                        width: this.innerWidth * 0.75 / 6,
                    }
                ]}
                key={index}
                onPress={() => {
                    requestAnimationFrame(() => {
                        this.handlePress(letter, index);
                    });
                }}
            >
                <Text style={styles.txt}>{letter}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { width } = Dimensions.get('window');

        this.gutter = width * 0.05;
        this.innerWidth = width * 0.9;

        return (
            <View 
                style={[
                    styles.container,
                    {
                        paddingTop: this.gutter,
                        paddingBottom: this.gutter
                    }
                ]}
                onLayout={({ nativeEvent: e }) => {
                    this.props.layout(e);
                }}
            >
                {
                    letter.map(this._renderItem)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'container': {
        backgroundColor: '#FFF',
        marginBottom: scaleSize(15),
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    'item': {
        height: scaleSize(35),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#dedfe0',
        borderRadius: 5
    },
    'txt': {
        fontSize: setSpText(14),
        color: '#2d2d2d'
    }
});
