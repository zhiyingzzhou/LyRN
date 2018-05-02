import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';

import TrainDecorator from '../train_decorator';

import _ from '../../util';

const pureText = (content, style, fontSize) => {
    if (!fontSize) {
        fontSize = style;
        style = {};
    }

    if (_.isNumber(style)) {
        style = [style];
    }
    
    return <Text style={[
        { color: '#FFF' },
        ...style,
        {
            fontSize: setSpText(fontSize),
            lineHeight: setSpText(fontSize)
        }
    ]}>{content}</Text>;
};

@TrainDecorator
class TrainInfoComponent extends Component {

    static propTypes = {
        data: PropTypes.object
    }

    state = {}

    componentWillMount() {
        this.covertToMonthAnDay();
    }

    render() {
        const { width } = Dimensions.get('window');
        const { bDate = {}, eDate = {} } = this.state;
        const { data } = this.props;
        const { 
            fmcity, tocity, fmtime, totime, trainno, usedtime, selectedSeats: { cn, price } 
        } = data;

        return (
            <View style={styles.container}>
                {/* 背景开始 */}
                <Image 
                    source={require('../../images/trainBookTop.jpg')}
                    style={{
                        position: 'absolute',
                        height: scaleSize(138),
                        width,
                        top: 0,
                        left: 0
                    }}
                    resizeMode="cover"
                />
                {/* 背景结束 */}
                <View style={[
                    styles.item,
                    {
                        alignItems: 'flex-end',
                        paddingRight: scaleSize(6)
                    }
                ]}>
                    {pureText(fmcity, styles.station, 17)}
                    {pureText(fmtime, styles.stationTime, 30)}
                    <View style={styles.stationDateContainer}>
                        {pureText(bDate.date, 13)}
                        {pureText(bDate.weekDay, styles.stationDate, 13)}
                    </View>
                    {pureText(trainno, 14)}
                </View>
                <View style={[
                    styles.item,
                    {
                        alignItems: 'center',
                        paddingTop: scaleSize(15)
                    }
                ]}>
                    {pureText(usedtime, 14)}
                    <View style={[
                        styles.stopInfo,
                        {
                            marginTop: scaleSize(5)
                        }
                    ]}>
                        <View style={styles.stopInfoLine}>
                        </View>
                        <View style={{
                            borderWidth: StyleSheet.hairlineWidth,
                            borderColor: '#FFF'
                        }}>
                            {pureText('经停信息', { color: '#FFF' }, 14)}
                        </View>
                        <View style={styles.stopInfoLine}>
                        </View>
                    </View>
                    {pureText(`¥${price}`, styles.price, 14)}
                </View>
                <View style={[
                    styles.item,
                    {
                        alignItems: 'flex-start',
                        paddingLeft: scaleSize(6)
                    }
                ]}>
                    {pureText(tocity, styles.station, 17)}
                    {pureText(totime, styles.stationTime, 30)}
                    <View style={styles.stationDateContainer}>
                        {pureText(eDate.date, 13)}
                        {pureText(eDate.weekDay, styles.stationDate, 13)}
                    </View>
                    {pureText(cn, 14)}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: scaleSize(15),
        paddingBottom: scaleSize(15),
        height: scaleSize(138),
        backgroundColor: 'transparent'
    },
    item: {
        flex: 1,
        height: scaleSize(108)
    },
    station: {
        paddingBottom: scaleSize(10),
    },
    stationTime: {
        paddingBottom: scaleSize(8),
    },
    stationDateContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: scaleSize(12)
    },
    stationDate: {
        marginLeft: scaleSize(10)
    },
    stopInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    stopInfoLine: {
        width: scaleSize(20),
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#FFF'
    },
    price: {
        position: 'absolute',
        bottom: 0
    }
});

export default TrainInfoComponent;
