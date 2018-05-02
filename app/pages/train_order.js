import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ScrollView
} from 'react-native';

import TrainInfoComponent from '../components/train_order/train_info';
import ConcatComponent from '../components/train_order/contact';
import GetFreeComponent from '../components/train_order/getfree';
import SubmitButtonComponent from '../components/submit_button';

import ListItemComponent from '../components/list_item';

export default class TrainOrderPage extends Component {

    childContextTypes = {
        navigation: PropTypes.object
    }

    getChildContext = {
        navigation: this.props.navigation
    }

    static propTypes = {
        navigation: PropTypes.object
    }

    render() {
        const { navigation: { state: { params: { data } } } } = this.props;

        return (
            <View 
                style={{ 
                    flex: 1, 
                    paddingBottom: 50
                }}
            >
                <ScrollView>
                    <TrainInfoComponent data={data} />
                    <ListItemComponent
                        data = {{
                            style: {
                                marginTop: 0,
                                marginLeft: 0,
                                marginRight: 0
                            },
                            list: [
                                {
                                    onPress: () => {
                                        this.props.navigation.navigate('OnlineSelectSeat', { data });
                                    },
                                    title: '在线选座',
                                    after: '选座'
                                }
                            ]
                        }}
                    />
                
                    <ConcatComponent />
                
                    <ListItemComponent
                        data = {{
                            list: [
                                {
                                    onPress: () => {
                                        this.props.navigation.navigate('Combo', { ...data });
                                    },
                                    title: '优选服务',
                                    after: '服务名称'
                                }
                            ]
                        }}
                    />

                    <ListItemComponent
                        data = {{
                            list: [
                                {
                                    onPress: () => {
                                        this.props.navigation.navigate('Tinsurance');
                                    },
                                    title: '行程保险',
                                }
                            ]
                        }}
                    />

                    <GetFreeComponent />

                    <ListItemComponent
                        data = {{
                            style: {
                                marginBottom: 50
                            },
                            list: [
                                {
                                    onPress: () => {
                                    },
                                    title: '同程优惠',
                                    after: '暂无可用代金券'
                                }
                            ]
                        }}
                    />
                </ScrollView>
                <SubmitButtonComponent
                    style={{
                        backgroundColor: '#3C6',
                    }}
                >
                    <Text style={{
                        color: '#FFF',
                        fontSize: setSpText(18),
                        fontWeight: 'bold'
                    }}>提交订单</Text>
                </SubmitButtonComponent>
            </View>
        );
    }
}
