import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native';

import TrainInfoComponent from '../components/online_select_seat/train_info';
import SeatsComponent from '../components/online_select_seat/seats';
import ListItemComponent from '../components/list_item';

import SubmitButtonComponent from '../components/submit_button';

const checkbox = {
    true: require('../images/icon2_checkbox_active.png'),
    false: require('../images/icon_checkbox.png')
};

export default class OnlineSelectSeatPage extends Component {

    static propTypes = {
        navigation: PropTypes.object
    }

    childContextTypes = {
        navigation: PropTypes.object
    }

    getChildContext = {
        navigation: this.props.navigation
    }

    state = {
        isSelect: false
    }

    renderTitle1() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image 
                    source={require('../images/icon_add.png')}
                    style={{
                        width: scaleSize(18),
                        height: scaleSize(18)
                    }}
                />
                <Text style={{
                    fontSize: setSpText(16),
                    color: '#3c6',
                    marginLeft: scaleSize(5)
                }}>添加乘客</Text>
            </View>
        );
    }

    renderInput() {
        return (
            <TextInput 
                style={{
                    padding: scaleSize(0),
                    flex: 1,
                    marginLeft: scaleSize(20),
                    fontSize: setSpText(16),
                    color: '#333'
                }}
                maxLength={11}
                placeholder="用于接收购票信息"
                placeholderTextColor="#ccc"
                underlineColorAndroid="transparent"
                keyboardType="numeric"
            />
        );
    }

    renderTitle2(title, after, isHot = false) {
        return (
            <View style={{
                height: Platform.OS === 'ios' ? scaleSize(44) : scaleSize(50),
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: scaleSize(15)
            }}>
                {isHot
                    ? <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: scaleSize(27),
                        height: scaleSize(27),
                        borderTopLeftRadius: 3,
                        overflow: 'hidden'
                    }}>
                        <Image 
                            source={
                                require('../images/icon_hot.png')
                            }
                            style={{
                                width: scaleSize(27),
                                height: scaleSize(27)
                            }}
                        />
                    </View>
                    : null
                }
                <Text style={{
                    fontSize: setSpText(16),
                    color: '#666'
                }}>{title}</Text>
                <Text style={{
                    fontSize: setSpText(16),
                    color: '#ccc',
                    marginLeft: scaleSize(20)
                }}>{after}</Text>
            </View>
        );
    }

    renderTitle3() {
        return (
            <View style={{
                paddingTop: scaleSize(11),
                paddingBottom: scaleSize(11),
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image 
                    source={require('../images/guarantee.png')}
                    style={{
                        width: scaleSize(25),
                        height: scaleSize(25),
                    }}
                    resizeMode="cover"
                />
                <View style={{
                    marginLeft: scaleSize(15)
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            fontSize: setSpText(16),
                            color: '#333'
                        }}>
                        保证达
                        </Text>
                        <Image 
                            source={require('../images/info.png')}
                            style={{
                                width: scaleSize(15),
                                height: scaleSize(15),
                                marginLeft: scaleSize(5)
                            }}
                            resizeMode="cover"
                        />
                    </View>
                    <Text style={{
                        fontSize: setSpText(12),
                        color: '#999',
                        marginTop: scaleSize(5)
                    }}>
                        车票配送遗失、延误，赔付损失
                    </Text>
                </View>
            </View>
        );
    }

    renderAfter() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: setSpText(14),
                    lineHeight: setSpText(14),
                    color: '#999'
                }}>¥5/人</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        this.setState({
                            isSelect: !this.state.isSelect
                        });
                    }}
                >
                    <Image 
                        source={checkbox[this.state.isSelect]}
                        style={{
                            width: scaleSize(22),
                            height: scaleSize(22),
                            marginRight: scaleSize(7),
                            marginLeft: scaleSize(13)
                        }}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const { state: { params: { data = {} } } } = this.props.navigation;
        
        return (
            <View style={{
                flex: 1
            }}>
                <ScrollView>
                    <TrainInfoComponent data={data} />
                    <SeatsComponent data={data} />
                    <ListItemComponent
                        data={{
                            list: [
                                {
                                    title: this.renderTitle1()
                                }
                            ]
                        }}
                    />
                    <ListItemComponent
                        data={{
                            list: [
                                {
                                    title: '联系手机',
                                    linkIcon: false,
                                    after: this.renderInput()
                                }
                            ]
                        }}
                    />
                    <ListItemComponent
                        data={{
                            list: [
                                {
                                    style: {
                                        paddingLeft: scaleSize(0)
                                    },
                                    title: this.renderTitle2('指定座位', '请指定座位', true)
                                }, 
                                {
                                    style: {
                                        paddingLeft: scaleSize(0)
                                    },
                                    title: this.renderTitle2('取票方式', '指定取票方式')
                                }
                            ]
                        }}
                    
                    />
                    {/* 保证达开始 */}
                    <ListItemComponent
                        data={{
                            list: [
                                {
                                    style: {
                                        height: 'auto',
                                    }, 
                                    linkIcon: false,
                                    title: this.renderTitle3(),
                                    after: this.renderAfter()
                                }
                            ]
                        }}
                    />
                    {/* 保证达结束 */}
                    <ListItemComponent
                        data={{
                            list: [
                                {
                                    title: '优先出票套餐',
                                    after: '未选择'
                                }
                            ]
                        }}
                    />
                    <ListItemComponent
                        data={{
                            list: [
                                {
                                    title: '行程保险',
                                    after: '安全出行，建议选购保险',
                                    titleStyle: {
                                        color: '#999'
                                    }
                                }
                            ]
                        }}
                    />
                    <ListItemComponent
                        data={{
                            list: [
                                {
                                    title: '套餐发票',
                                    after: '不需要',
                                    titleStyle: {
                                        color: '#999'
                                    }
                                }
                            ]
                        }}
                    />
                </ScrollView>
                <SubmitButtonComponent style={{
                    backgroundColor: '#FFF',
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderTopColor: '#EEE'
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        // paddingLeft: scaleSize(15)
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: setSpText(16),
                            color: '#4d4d4d'
                        }}>总价</Text>
                        <Text style={{
                            fontSize: setSpText(14),
                            color: '#ff6540',
                            marginLeft: scaleSize(5)
                        }}>¥</Text>
                        <Text style={{
                            fontSize: setSpText(18),
                            color: '#ff6540',
                            marginRight: 2
                        }}>0</Text>
                        {/* <Image 
                            source={require('../images/pay_arrow.png')}
                            style={{
                                width: scaleSize(20),
                                height: scaleSize(20),
                                transform: [
                                    {
                                        rotate: '-90deg'
                                        
                                    },
                                    {
                                        scale: 0.8
                                    }
                                ]
                            }}
                        /> */}
                    </View>
                    <View style={{
                        flex: 1,
                        height: scaleSize(50),
                        backgroundColor: '#3c6',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: setSpText(18),
                            color: '#FFF'
                        }}>提交订单</Text>
                    </View>
                </SubmitButtonComponent>
            </View>
        );
    }
}
