import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import SubmitButtonComponent from '../components/submit_button';

export default class ContactPage extends Component {

    static propTypes = {
        navigation: PropTypes.object
    }

    _renderAddConactButton = () => {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        this.props.navigation.navigate('AddContact');
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: scaleSize(44),
                        backgroundColor: '#FFF',
                        shadowColor: '#eee',
                        shadowOffset: { width: 1, 
                            height: 1 },
                        shadowOpacity: 1
                    }}>
                        <Image 
                            source={require('../images/icon_add.png')}
                            style={{
                                width: scaleSize(18),
                                height: scaleSize(18)
                            }}
                            resizeMode="cover"
                        />
                        <Text style={{
                            fontSize: setSpText(18),
                            color: '#3bc367',
                            marginLeft: scaleSize(5)
                        }}>新增乘客</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{
                    fontSize: setSpText(16),
                    color: '#c0c5d0',
                    textAlign: 'center',
                    paddingTop: scaleSize(45)
                }}>
                您还没有同程常旅，{'\r\n'}
                请点击上方的“新增乘客”进行添加。 
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {this._renderAddConactButton()}
                </ScrollView>
                {/* 确认按钮开始 */}
                <SubmitButtonComponent>
                    <Text style={{
                        fontSize: 18,
                        color: '#FFF'
                    }}>确认</Text>
                </SubmitButtonComponent>
                {/* 确认按钮结束 */}
            </View>
        );
    }
}
