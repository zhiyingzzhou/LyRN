import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    Text,
    Switch,
    StyleSheet
} from 'react-native';

// import CardView from 'react-native-cardview';
import ListItemComponent from '../list_item';

export default class GetFreeComponent extends Component {

    static propTypes = {
    }

    state = { isPay: false }

    _renderTitle() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image 
                    source={require('../../images/getfree.png')}
                    style={{
                        width: scaleSize(28),
                        height: scaleSize(28)
                    }}
                />
                <View style={{
                    marginLeft: scaleSize(10)
                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: setSpText(16),
                            lineHeight: setSpText(16),
                            color: '#666'
                        }}>一元免单</Text>
                        <View style={{
                            marginLeft: scaleSize(24),
                            paddingTop: scaleSize(2),
                            paddingBottom: scaleSize(2),
                            paddingLeft: scaleSize(5),
                            paddingRight: scaleSize(5),
                            borderColor: '#FF6540',
                            borderWidth: StyleSheet.hairlineWidth
                        }}>
                            <Text style={{
                                fontSize: setSpText(12),
                                lineHeight: setSpText(12),
                                color: '#FF6540'
                            }}>热卖</Text>
                        </View>
                    </View>
                    <Text style={{
                        fontSize: setSpText(12),
                        color: '#999'
                    }}>支付一元赢订单全额免费</Text>
                </View>
            </View>
        );
    }

    _renderAfter() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: setSpText(16),
                    color: '#999',
                    marginRight: scaleSize(8)
                }}>
                    ¥1/人
                </Text>
                <Switch 
                    value={this.state.isPay}
                    onValueChange={(val) => { 
                        this.setState({ isPay: val });
                    }}
                />
            </View>
        );
    }

    render() {

        return (
            <ListItemComponent
                data={{
                    list: [
                        {
                            style: {
                                paddingTop: scaleSize(15),
                                paddingBottom: scaleSize(10),
                                height: 'auto'
                            },
                            title: this._renderTitle(),
                            after: this._renderAfter(),
                            linkIcon: false
                        }
                    ]
                }}
            />
        );
    }
}
