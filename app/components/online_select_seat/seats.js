import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import _ from '../../util';

export default class SeatsComponent extends Component {

    static propTypes = {
        data: PropTypes.object
    }

    state = { seatsMap: [] }

    componentWillMount() {
        const { data: { ticketstatus, selectedSeats } } = this.props;
        const seatsMap = [];
                
        for (const i in ticketstatus) {
            if (!_.isNull(ticketstatus[i])) {
                ticketstatus[i].isSelected = false;
                // 判断是否是选择的车座
                if (selectedSeats.cn === ticketstatus[i].cn) {
                    ticketstatus[i].isSelected = true;
                }
                if (ticketstatus[i].seats > 0) {
                    ticketstatus[i].txtColor = '#333';
                    ticketstatus[i].priceColor = '#ff6540';
                } else {
                    ticketstatus[i].txtColor = '#bbb';
                    ticketstatus[i].priceColor = '#bbb';
                }
                seatsMap.push(ticketstatus[i]);
            }
        }
        this.setState({
            seatsMap
        });
    }

    handlePres = (index) => {
        const { seatsMap } = this.state;

        seatsMap.forEach((seat) => {
            seat.isSelected = false;
        });
        seatsMap[index].isSelected = true;
        this.setState({
            seatsMap
        });
    }

    _renerSeatsMap() {
        return this.state.seatsMap.map((seat, index) => {
            const { cn, price, seats, isSelected, txtColor, priceColor } = seat;

            const style = isSelected ? {
                backgroundColor: 'rgba(51,204,102,.1)',
                borderColor: 'rgba(51,204,102,.6)',
                borderWidth: StyleSheet.hairlineWidth,
            } : {
            };
            
            return (
                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => {
                        seats > 0 && this.handlePres(index);
                    }}
                    key={index} 
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: scaleSize(10),
                        paddingBottom: scaleSize(10),
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderRightWidth: StyleSheet.hairlineWidth,
                        borderColor: '#ddd',
                        ...style
                    }}> 
                    <View>
                        <Text style={[
                            styles.seatName,
                            {
                                color: txtColor
                            }
                        ]}>{cn}</Text>
                        <Text style={[
                            styles.price,
                            {
                                color: priceColor
                            }
                        ]}>¥{price}</Text>
                        <Text style={[
                            styles.number,
                            {
                                color: txtColor
                            }
                        ]}>{seats}张</Text>
                    </View>
                    {isSelected 
                        ? <Image 
                            source={require('../../images/icon_right.png')}
                            style={{
                                width: scaleSize(13),
                                height: scaleSize(13),
                                position: 'absolute',
                                right: scaleSize(6),
                                bottom: scaleSize(6),
                                zIndex: 500
                            }}
                        />
                        : null}
                </TouchableOpacity>
            );
        });
    }

    render() {
        return (
            <View style={styles.wrapper}>
                {this._renerSeatsMap()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        shadowColor: 'rgba(0,0,0,.1)',
        shadowOffset: { width: scaleSize(1), 
            height: scaleSize(2) }
    },
    seatName: {
        fontSize: setSpText(12),
        lineHeight: setSpText(12),
        color: '#333'
    },
    price: {
        fontSize: setSpText(12),
        lineHeight: setSpText(12),
        marginTop: scaleSize(8),
        color: '#ff6540'
    },
    number: {
        fontSize: setSpText(12),
        lineHeight: setSpText(12),
        marginTop: scaleSize(8),
        color: '#333'
    }
});
