import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import TrainDecorator from '../train_decorator';

@TrainDecorator
export default class TrainInfoComponent extends Component {
    static propTypes = {
        data: PropTypes.object
    }

    state = {
        bDate: {},
        eDate: {}
    }

    componentWillMount() {
        this.covertToMonthAnDay();
    }

    render() {
        const { fmcity, fmtime, tocity, totime, trainno } = this.props.data;
        const { bDate, eDate } = this.state;

        return (
            <View style={{
                height: scaleSize(100),
                flexDirection: 'row'
            }}>
                <Image 
                    source={require('../../images/ticketsInfo.png')}
                    resizeMode="cover"
                    style={{
                        height: scaleSize(100),
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                />
                <View style={[
                    styles.item,
                    styles.side,
                    {
                        alignItems: 'flex-start'
                    }
                ]}>
                    <Text style={styles.city}>
                        {fmcity}
                    </Text>
                    <Text style={styles.time}>
                        {fmtime}
                    </Text>
                    <View style={styles.date}>
                        <Text style={styles.datetime}>
                            {bDate.dateS}
                        </Text>
                        <Text style={[
                            styles.datetime,
                            styles.weekDay
                        ]}>
                            {bDate.weekDay}
                        </Text>
                    </View>
                </View>
                <View style={[
                    styles.item,
                    styles.center,
                ]}>
                    <Text style={styles.trainno}>
                        {trainno}次
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={styles.line}>
                        </View>
                        <View style={{
                            width: scaleSize(58),
                            height: scaleSize(17),
                            borderColor: '#FFF',
                            borderWidth: StyleSheet.hairlineWidth,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: setSpText(12),
                                color: '#FFF'
                            }}>经停信息</Text>
                        </View>
                        <View style={styles.line}>
                        </View>
                    </View>
                </View>
                <View style={[
                    styles.item,
                    styles.side,
                    {
                        alignItems: 'flex-end'
                    }
                ]}>
                    <Text style={styles.city}>
                        {tocity}
                    </Text>
                    <Text style={styles.time}>
                        {totime}
                    </Text>
                    <View style={styles.date}>
                        <Text style={styles.datetime}>
                            {eDate.dateS}
                        </Text>
                        <Text style={[
                            styles.datetime,
                            styles.weekDay
                        ]}>
                            {bDate.weekDay}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    side: {
        paddingTop: scaleSize(15),
        paddingLeft: scaleSize(20),
        paddingRight: scaleSize(20)
    },
    center: {
        alignItems: 'center',
        paddingTop: scaleSize(30),
    },
    city: {
        fontSize: setSpText(14),
        lineHeight: setSpText(14),
        color: '#FFF',
        marginBottom: scaleSize(9),
    },
    time: {
        fontSize: setSpText(30),
        lineHeight: setSpText(30),
        color: '#FFF',
        marginBottom: scaleSize(6),
    },
    date: {
        flexDirection: 'row'
    },
    datetime: {
        color: '#FFF',
        fontSize: setSpText(12),
        lineHeight: setSpText(12)
    },
    weekDay: {
        marginLeft: scaleSize(6)
    },
    trainno: {
        color: '#FFF',
        fontSize: setSpText(12),
        marginBottom: scaleSize(6)
    },
    line: {
        width: scaleSize(16),
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#FFF'
    }
});
