import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class QueryDateComponent extends Component {

    static propTypes = {
        tripTime: PropTypes.string,
        tripTimeDes: PropTypes.string,
        handlePress: PropTypes.func
    }

    covertDate(time) {
        const dateArr = time.split('-');

        return `${dateArr[1]}月${dateArr[2]}日`;
    }

    handlePress = () => {
        requestAnimationFrame(() => {
            const { handlePress } = this.props;

            handlePress && handlePress(); // eslint-disable-line
        });
    }

    render() {
        const { tripTime, tripTimeDes } = this.props;
        
        return (
            <TouchableOpacity onPress={this.handlePress} style={styles.query_date}>
                <View style={styles.query_date_inner}>
                    <Text style={styles.date}>
                        {this.covertDate(tripTime)}
                        <Text style={styles.date_txt}>{tripTimeDes}</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    'query_date': {
        marginLeft: scaleSize(15),
        marginRight: scaleSize(15),
        minHeight: scaleSize(61),
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#dcdcdc'
    },
    'query_date_inner': {
        flexDirection: 'row',
    },
    date: {
        fontSize: setSpText(25),
        color: '#333'
    },
    'date_txt': {
        color: '#999',
        fontSize: setSpText(14)
    },
});
