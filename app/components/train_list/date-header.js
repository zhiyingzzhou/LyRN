import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Animated
} from 'react-native';

import date from '../../util/date';

import { connect } from 'react-redux';

const themeColor = '#3C6';
// const imageScale = 12 / 22;

class DateHeaderComponent extends Component {

    static contextTypes = {
        navigation: PropTypes.object,
    }

    static propTypes = {
        trainlistTime: PropTypes.string,
        getTrainList: PropTypes.func
    };

    static defaultProps={
    }

    state = {
        dayArr: [],
        index: 0
    }

    endSubscribeTime = date.endSubscribeTime();

    componentWillMount() {
        this.todayTimeStamp = date.getToday(); // 提前存储当日的时间戳

        const { navigation: { state: { params: { tripTime } } } } = this.context;
        // 将当前选择的时间戳存入数组

        this.setState({
            dayArr: [date.resetTime(tripTime)]
        });

        this.animtedValue = new Animated.Value(0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.trainlistTime !== this.props.trainlistTime) {
            this.setState({
                dayArr: [date.resetTime(nextProps.trainlistTime)],
                index: 0
            }, () => {
                this.startAnimation(this.state.index, 0, () => {
                    // 重新刷新列车时刻表
                    this.props.getTrainList(nextProps.trainlistTime, true);
                });
            });
        }
    }

    shouldComponentWillUpdate(nextProps, nextState) {
        return this.state.dayArr !== nextState.dayArr || this.state.index !== nextState.index;
    }

    startAnimation(value, duration, callback) {
        Animated.timing(this.animtedValue, {
            toValue: value,
            duration,
            useNativeDriver: true
        }).start(() => { 
            if (callback) {
                callback();
            }
        });
    }

    selectPrevDay = () => {
        requestAnimationFrame(() => {
            const { dayArr } = this.state;
            let { index } = this.state;

            if (index > 0) {
                index--;
                this.setState({ index });
                this.startAnimation(index, 200, () => {
                    
                    // 刷新时刻表
                    this.props.getTrainList(date.covertToMonthAndDay(dayArr[index]).dateSeq, true);
                });
            } else {
                const prevDayTimeStamp = dayArr[0] - 8.64e7;

                // 如果上一天大于今天，允许切换
                if (this.todayTimeStamp <= prevDayTimeStamp) {
                    dayArr.unshift(prevDayTimeStamp);
                    this.setState({
                        dayArr
                    }, () => {
                        this.startAnimation(index + 1, 0, () => { 
                            this.startAnimation(index, 200, () => {
                                // 刷新列表时刻表
                                this.props.getTrainList(date.covertToMonthAndDay(prevDayTimeStamp).dateSeq, true);
                            });
                        });
                    });  
                }
            }
        });
    }

    selectNextDay = () => {
        requestAnimationFrame(() => {
            const { dayArr } = this.state;
            let { index } = this.state;

            if (index < dayArr.length - 1) {
                index++;
                this.setState({ index });
                this.startAnimation(index, 200, () => {
                    const time = date.covertToMonthAndDay(dayArr[index]).dateSeq;

                    // 刷新时刻表
                    this.props.getTrainList(date.covertToMonthAndDay(time).dateSeq, true);
                });
            } else {
                const time = dayArr[dayArr.length - 1] + 8.64e7;

                dayArr.push(time);
                this.setState({
                    dayArr
                }, () => {
                    index++;
                    this.setState({ index });
                    this.startAnimation(index, 200, () => {
                        // 刷新时刻表
                        this.props.getTrainList(date.covertToMonthAndDay(time).dateSeq, true);
                    });
                });
            }
        });
    }

    toSelectDate = () => {
        const { index, dayArr } = this.state;

        requestAnimationFrame(() => {
            this.context.navigation.navigate('Calendar', {
                key: 'trainlistTime',
                selectedTime: dayArr[index]
            });
        });
    }

    render() {
        const { dayArr, index } = this.state;
        const { width } = Dimensions.get('window');
        const btnWidth = (width - 12) * 0.28;
        const lastIndex = dayArr.length - 1;
        
        const isPreventSelectPrev = dayArr[index > 0 ? index : 0] === this.todayTimeStamp;
        const isPreventSelectNext = index === lastIndex && dayArr[lastIndex] === this.endSubscribeTime;
        
        return (
            <View style={styles.header}>
                {/* 前一天开始 */}
                <TouchableOpacity
                    onPress={!isPreventSelectPrev ? this.selectPrevDay : null}
                >
                    <View style={[
                        styles.btn,
                        {
                            width: btnWidth,
                            paddingLeft: 15
                        }
                    ]}>
                        {/* <Image
                            source={require('../../images/arrow_left.png')}
                            resizeMode="cover"
                            style={
                                {
                                    width: 6,
                                    height: 6 / imageScale,
                                    marginRight: 6
                                }
                            }
                        /> */}
                        <Text style={[
                            styles.btn_txt,
                            {
                                opacity: isPreventSelectPrev ? 0.4 : 1
                            }
                        ]}>
                        前一天
                        </Text>
                    </View>
                </TouchableOpacity>
                {/* 前一天结束 */}
                {/* 日历开始 */}
                <TouchableOpacity 
                    style={{
                        width: 150,
                        height: 32,
                        backgroundColor: '#f4f4f4',
                        flexDirection: 'row',
                        borderRadius: 3,
                        overflow: 'hidden'
                    }}
                    activeOpacity={0.4}
                    onPress={this.toSelectDate}
                >
                    <Animated.View style={{
                        width: dayArr.length * 110,
                        height: 32,
                        flexDirection: 'row',
                        alignItems: 'center',
                        transform: [
                            {
                                translateX: this.animtedValue.interpolate({
                                    inputRange: [
                                        -1,
                                        0, 
                                        1
                                    ],
                                    outputRange: [
                                        110,
                                        0, 
                                        -110
                                    ]
                                })
                            }
                        ]
                        
                    }}
                    >
                        {
                            dayArr.map((timeStamp, index) => {
                                const time = date.covertToMonthAndDay(timeStamp);
                                
                                return (
                                    <View key={index} style={{ flex: 1, 
                                        alignItems: 'center', 
                                        justifyContent: 'center' }}>
                                        <Text style={{
                                            fontSize: 14,
                                            color: themeColor
                                        }}>{time.date} {time.weekDay}</Text>
                                    </View>
                                );
                            })
                        }
                    </Animated.View> 
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            width: 40,
                            zIndex: 100,
                            backgroundColor: '#f4f4f4',
                            right: 0,
                            height: 32,
                        }}
                    >
                        <Image 
                            source={require('../../images/calendar.png')} 
                            style={{
                                width: 15,
                                height: 15
                            }}
                        />
                    </View>
                </TouchableOpacity>
                {/* 日历结束 */}
                {/* 后一天开始 */}
                <TouchableOpacity
                    onPress={!isPreventSelectNext ? this.selectNextDay : null}
                >
                    <View style={[
                        styles.btn,
                        {
                            width: btnWidth,
                            justifyContent: 'flex-end',
                            paddingRight: 15
                        }
                    ]}>
                        <Text style={[
                            styles.btn_txt,
                            {
                                opacity: isPreventSelectNext ? 0.4 : 1
                            }
                        ]}>
                        后一天
                        </Text>
                        {/* <Image
                            style={
                                {
                                    width: 6,
                                    height: 6 / imageScale,
                                    marginLeft: 6
                                }
                            }
                            source={require('../../images/arrow_right.png')}
                        /> */}
                    </View>
                </TouchableOpacity>
                {/* 后一天结束 */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'header': {
        paddingTop: 12.5,
        paddingBottom: 12.5,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e4e4e4',
        marginBottom: 5
    },
    'btn': {
        height: 24,
        flexDirection: 'row',
        alignItems: 'center'
    },
    'btn_txt': {
        fontSize: setSpText(14),
        color: themeColor
    }
});

const mapStateToProps = (state) => ({
    trainlistTime: state.Date.trainlistTime
});

export default connect(mapStateToProps, () => ({}))(DateHeaderComponent);
