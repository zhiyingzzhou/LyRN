import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TextInput,
    Platform
} from 'react-native';

import ListItemComponent from '../list_item';

export default class ContactComponent extends Component {

    static contextTypes = {
        navigation: PropTypes.object
    }

    static propTypes = {
    }

    addPeople() {
        return (
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    width: scaleSize(18),
                    height: scaleSize(18)
                }}>
                    <View
                        style={{
                            width: scaleSize(2),
                            height: scaleSize(18),
                            backgroundColor: '#3C6',
                            position: 'absolute',
                            left: 8
                        }}
                    ></View>
                    <View
                        style={{
                            width: scaleSize(18),
                            height: scaleSize(2),
                            backgroundColor: '#3C6',
                            position: 'absolute',
                            top: 8
                        }}
                    ></View>
                </View>
                <Text style={{
                    color: '#3C6',
                    fontSize: setSpText(16),
                    // lineHeight: setSpText(16),
                    marginLeft: scaleSize(15),
                    marginTop: Platform.OS === 'ios' ? 2 : 0
                }}>
                    添加/修改乘客
                </Text>
            </View>
        );
    }

    _renderInput() {
        return (
            <View style={{
                flex: 1
            }}>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="用于接收购票信息"
                    placeholderTextColor="#CCC"
                    keyboardType="numeric"
                    maxLength={11}
                    style={{
                        padding: scaleSize(0),
                        fontSize: setSpText(16),
                        // lineHeight: setSpText(16),
                        height: scaleSize(44),
                        marginLeft: scaleSize(15)
                    }}
                />
            </View>
        );
    }

    render() {
        return (
            <ListItemComponent
                data = {{
                    list: [
                        {  
                            onPress: () => {
                                this.context.navigation.navigate('Contact');
                            },
                            title: this.addPeople()
                        },
                        {
                            title: '手机号码',
                            after: this._renderInput(),
                            linkIcon: false
                        }
                    ]
                }}
            />
        );
    }
}
