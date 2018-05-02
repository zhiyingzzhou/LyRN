import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

export default class CalendarHeaderPage extends Component {

    weekList = [
        '日',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六'
    ];

    shouldComponentUpdate() {
        return false;
    }

    _renderWeekHeader = (text, index, list) => {
        return (
            <View
                style={[
                    styles.header_item,
                    { width: this.innerWidth / 7 }
                ]}
                key={index}
            >
                <Text style={[
                    styles.header_item_txt,
                    { color: index === 0 || index === list.length - 1 ? '#04be02' : '#FFF' }
                ]}>{text}</Text>
            </View>
        );
    }

    render() {
        const { width } = Dimensions.get('window');

        this.innerWidth = width * 0.9;

        return (
            <View style={styles.header}>
                {this.weekList.map(this._renderWeekHeader)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'header': {
        flexDirection: 'row',
        backgroundColor: '#556a72',
        justifyContent: 'center'
    },
    'header_item': {
        height: 33,
        justifyContent: 'center',
        alignItems: 'center'
    },
    'header_item_txt': {
        fontSize: 14
    }
});
