import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';

import ListItemComponent from '../components/list_item';
// import PickerComponent from '../components/picker';
import Picker from 'react-native-picker';
// import DatePickerComponent from '../components/date_picker';

const pickerTitleMap = {
    ticket: '选择车票类型',
    idCard: '选择证件类型',
    sex: '选择性别',
    birthDay: '选择日期'
};

const pickerDataMap = {
    contTypeName: [
        '成人票', 
        '儿童票'
    ],
    cardTypeName: [
        '身份证', 
        '护照',
        '台胞证',
        '港澳通行证'
    ],
    sexName: [
        '男',
        '女'
    ]
};

const nowDate = new Date(),
    years = [],
    months = [],
    initialYear = 1900,
    thisYear = nowDate.getFullYear(), // 今年的年份
    thisMonth = nowDate.getMonth() + 1, // 今年的月份
    thisDay = nowDate.getDate(); // 今年的日期

for (let i = 1; i <= 12; i++) {
    months.push(i); 
}

/**
 * @description 每个月的天数
 * @param {*} year 年份
 */

const getDayNum = (year) => {
    const dayOfMonth = [
        31, 
        28, 
        31, 
        30, 
        31, 
        30, 
        31, 
        31, 
        30, 
        31, 
        30, 
        31
    ];
    // 如果为闰年，2月份有29天

    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        dayOfMonth[1] = 29;
    }
    
    return dayOfMonth;
};

for (let i = initialYear; i <= thisYear; i++) {
    const dayOfMonth = getDayNum(i);

    const monthData = [];

    // if (i === thisYear) { 
    months.forEach((item, index) => {
        const days = [];

        for (let i = 1; i <= dayOfMonth[index]; i++) {
            days.push(i);
        }
        monthData.push({
            [item]: days
        });
    });
    // }
    years.push({
        [i]: monthData
    });
}
const pickerOption = {
    pickerConfirmBtnText: '确定',
    pickerCancelBtnText: '取消',
    onPickerCancel: () => {
        Picker.hide();
    }
};

export default class AddContactPage extends Component {

    static propTypes = {
    }
    
    birthPlaceholder = '年/月/日'

    state = {
        name: '',
        contTypeName: '成人票', // 车票类型
        cardTypeName: '身份证', // 证件类型
        sexName: '男',
        cardNum: '',
        birth: `${thisYear}-${thisMonth}-${thisDay}`
    }

    initPicker(field) {
        const selectedValue = this.state[field];

        Picker.init({
            ...{
                pickerData: pickerDataMap[field],
                selectedValue: [selectedValue],
                pickerTitleText: pickerTitleMap[field],
                onPickerConfirm: ([value]) => {
                    // console.log(`pickerConfirm:${value}`);
                    this.setState({
                        [field]: value
                    });
                },
                onPickerSelect: () => {
                    // console.log(`pickerSelect:${value}`);
                }
            },
            ...pickerOption
        });
    }

    initDatePicker(field) {
        const birth = this.state[field];

        Picker.init({
            ...{
                pickerData: years,
                pickerTitleText: pickerTitleMap[field],
                selectedValue: birth.split('-'),
                onPickerConfirm: (value) => {
                    this.birthPlaceholder = '';
                    this.setState({
                        [field]: value.join('-')
                    }); 
                }
            },
            ...pickerOption
        });
    }

    _renderTitle(title) {
        return (
            <View style={{
                flex: 1
            }}>
                <Text style={{
                    color: '#666',
                    fontSize: setSpText(16)
                }}>{title}</Text>
            </View>
        );
    }

    _renderInputAfter(placeholder, keyboardType, maxLength, field) {
        return (
            <View style={{
                flex: 2.3
            }}>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder={placeholder}
                    placeholderTextColor="#CCC"
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    clearButtonMode="while-editing" // ios only
                    onChangeText={(value) => {
                        this.handleInputChange(field, value);
                    }}
                    value={this.state[field]}
                    style={{
                        padding: scaleSize(0),
                        fontSize: setSpText(16),
                        // lineHeight: setSpText(16),
                        // height: scaleSize(44),
                        flex: 1
                    }}
                />
            </View>
        );
    }

    _renderAfter = (field) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    requestAnimationFrame(() => {
                        this.initPicker(field);
                    });
                }} 
                style={{
                    flex: 2.3
                }}
            >
                <Text>{this.state[field]}</Text>
            </TouchableOpacity>
        );
    }

    _renderDateAfter = (field) => {
        const selectedValue = this.state[field];
        
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    requestAnimationFrame(() => {
                        this.initDatePicker(field);
                    });
                }} 
                style={{
                    flex: 2.3
                }}
            >
                <Text>{this.birthPlaceholder.length > 0 ? this.birthPlaceholder : selectedValue}</Text>
            </TouchableOpacity>
        );
    }

    _renderSubmitButton() {
        return (
            <TouchableOpacity 
                style={{
                    marginTop: scaleSize(40),
                    marginLeft: scaleSize(20),
                    marginRight: scaleSize(20),
                    height: scaleSize(50),
                    backgroundColor: '#3c6',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5
                }}
                onPress={() => {
                    requestAnimationFrame(() => {
                        this.handleSubmit();
                    });
                }}
            >
                <Text style={{
                    fontSize: setSpText(18),
                    color: '#FFF'
                }}>确定</Text>
            </TouchableOpacity>
        );
    }

    handleInputChange = (field, value) => {
        this.setState({
            [field]: value
        });
    }

    handleSubmit = () => {
        const { name, cardNum } = this.state;
        const matchCharacter = /[\d|\s|\W]/ig;

        if (name === '') {
            this.alert('请填写姓名');
            
            return false;
        }
        if (matchCharacter.test(name)) {
            this.alert('姓名只能包含中文或者英文，不能有空格、符号等特殊字符！');
            
            return false;
        }
        if (cardNum === '') {
            this.alert('请输入证件号码');
            
            return false;
        }
    }

    alert(content) {
        Alert.alert(
            '提示',
            content,
            [{ text: '确定' }]
        );
    }

    render() {
        const { cardTypeName } = this.state;

        const reset = cardTypeName !== '身份证' 
            ? [
                {
                    iconDirection: 'down',
                    title: this._renderTitle('生日'),
                    after: this._renderDateAfter('birth')
                },
                {
                    iconDirection: 'down',
                    title: this._renderTitle('性别'),
                    after: this._renderAfter('sexName')
                }
            ] : [];

        return (
            <View style={{
                flex: 1
            }}>
                <ScrollView>
                    <ListItemComponent 
                        data={{
                            borderRadius: 3,
                            list: [
                                {
                                    iconStyle: {
                                        opacity: 0,
                                    },
                                    title: this._renderTitle('姓名'),
                                    after: this._renderInputAfter('乘客姓名', 'default', 20, 'name')
                                },
                                {
                                    iconDirection: 'down',
                                    title: this._renderTitle('车票类型'),
                                    after: this._renderAfter('contTypeName')
                                },
                                {
                                    iconDirection: 'down',
                                    title: this._renderTitle('证件类型'),
                                    after: this._renderAfter('cardTypeName')
                                },
                                {
                                    iconStyle: {
                                        opacity: 0,
                                    },
                                    title: this._renderTitle('证件号码'),
                                    after: this._renderInputAfter('乘客证件号码', 'numeric', 18, 'cardNum')
                                },
                                ...reset
                            ]
                        }}
                    />
                    {this._renderSubmitButton()}
                </ScrollView>
            </View>
        );
    }
}
