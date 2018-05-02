import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    InteractionManager,
    Dimensions
} from 'react-native';

import date from '../../util/date';
import festival from '../../util/festival';

const themeColor = '#09bb07';
const grayBgColor = '#e7e7e7';

export default class CalendarMonthComponent extends Component {
    static defaultProps = {
        data: []
    }

    static contextTypes = {
        navigation: PropTypes.object
    }

    static propTypes = {
        data: PropTypes.array,
        onSelect: PropTypes.func,
        dayMap: PropTypes.object,
        selectedTime: PropTypes.number
    }

    endHolidayTime; // 放假结束日期的时间戳

    todayTimeStamp = date.getToday();
    startSubScribeTime = date.startSubScribeTime(); 
    endSubscribeTime = date.endSubscribeTime();

    dayIMap = [
        0,
        6,
        7, 
        13, 
        14, 
        20,
        21,
        27,
        28,
        34,
        35,
        41
    ]

    _refView = [];

    _refText = [];

    _recentList = [];

    handlePress = (time) => {
        // if (this._recentList.length > 0) {
        //     this._recentList.forEach((item) => {
        //         const { ref, style } = item;

        //         ref.setNativeProps({ style });
        //     });
        // }

        this._refView[time].setNativeProps({
            style: { backgroundColor: themeColor }
        });
        this._refText[time].setNativeProps({
            style: {
                color: '#FFF'
            }
        });
        // this._recentList[0] = {
        //     ref: this._refView[time],
        //     style: {
        //         backgroundColor: bgColor
        //     }
        // };
        // this._recentList[1] = {
        //     ref: this._refText[time],
        //     style: {
        //         color: txtColor
        //     }
        // };
        const { onSelect } = this.props;

        if (onSelect) {
            InteractionManager.runAfterInteractions(() => {
                onSelect(time);
            });
        }
    }

    _renderRow(day, index, year, month) {
        const time = day === null ? 0 : Number(new Date(year, month - 1, day));
        let bgColor = '#FFF', 
            numColor = '#2d2d2d', 
            handlePress;
        
        if (time < this.todayTimeStamp || time > this.endSubscribeTime) {
            numColor = '#CCC';
            handlePress = null;
        } else if (this.dayIMap.includes(index) && time !== 0) {
            numColor = themeColor;
        }

        handlePress = () => this.handlePress(time);

        if (time === 0 || time < this.todayTimeStamp || this.endSubscribeTime < time) {
            handlePress = null;
        }

        // 高亮上一选择的时间
        if (time === this.selectedTime) {
            bgColor = themeColor;
            numColor = '#FFF';
        } else if (this.dayMap[time] === '今天') {
            bgColor = grayBgColor;
        }

        // 节假日
        const fest = festival[time];
        let number;
        
        if (fest) {
            number = fest[0];
            const holidayNum = fest[1];

            if (holidayNum > 0) {
                this.endHolidayTime = time + holidayNum * 24 * 60 * 60 * 1000;
            }
        }

        let holidayTxt = false; // 是否显示假

        if (this.endHolidayTime && time < this.endHolidayTime) {
            holidayTxt = true;
        }

        if (time === this.endHolidayTime) {
            this.endHolidayTime = void 0;
        }

        // 预约
        let txt;
        
        if (time > this.startSubScribeTime && time <= this.endSubscribeTime) {
            txt = '可预约';
        }
        
        
        return (
            <TouchableOpacity
                onPress={handlePress}
                style={[
                    styles.each_day,
                    { width: this.innerWidth / 7 }
                ]} key={index}
            >
                <View 
                    ref={(ref) => { 
                        day !== null && (this._refView[time] = ref);
                    }} style={[
                        styles.each_day_number,
                        {
                            
                            backgroundColor: bgColor,
                            width: number ? scaleSize(50) : scaleSize(20)
                        }
                    ]}
                >
                    <Text 
                        ref={(ref) => { 
                            day !== null && (this._refText[time] = ref);
                        }} 
                        style={{
                            color: numColor, // 如果为每行的第一个或者最后一个字体高亮显示
                        }}
                    >{number ? number : day}</Text>
                </View>
                {
                    txt || this.dayMap[time]
                        ? <Text 
                            style={[
                                styles.each_day_txt,
                                { color: txt ? '#FF6540' : themeColor }
                            ]}
                        >{txt ? txt : this.dayMap[time]}</Text> 
                        : null
                }{
                    holidayTxt && <Text style={{
                        position: 'absolute',
                        top: scaleSize(3),
                        right: scaleSize(1),
                        fontSize: setSpText(10),
                        color: '#33cc66'
                    }}>假</Text>
                }
            </TouchableOpacity>
        );
    }

    render() {
        const { width } = Dimensions.get('window');
        const { data, dayMap } = this.props;
        const { navigation: { state: { params: { selectedTime } } } } = this.context;

        this.selectedTime = selectedTime; // 上一次选择的时间
        this.dayMap = dayMap;
        this.innerWidth = width * 0.9;

        return (
            <ScrollView style={{ flex: 1 }}>
                {
                    data.map((monthData, index) => {
                        const { year, month, dayList } = monthData;

                        return (
                            <View key={index}>
                                <View style={styles.month_header}>
                                    <Text style={styles.month_header_txt}>{year}年{month}月</Text>
                                </View>
                                <View style={styles.month_body}>
                                    {
                                        dayList.map(
                                            (day, dayIndex) => this._renderRow(day, dayIndex, year, month)
                                        )
                                    }
                                </View>
                            </View>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    'month_header': {
        height: scaleSize(30),
        backgroundColor: '#f2f5f7',
        alignItems: 'center',
        justifyContent: 'center'
    },
    'month_header_txt': {
        fontSize: setSpText(14),
        color: '#000'
    },
    'month_body': {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    'each_day': {
        height: scaleSize(50),
        // padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    'each_day_number': {
        // width: scaleSize(18),
        height: scaleSize(20),
        borderRadius: scaleSize(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    'each_day_txt': {
        fontSize: setSpText(11),
        lineHeight: setSpText(11),
        paddingTop: scaleSize(3),
    }
});
