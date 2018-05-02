import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Easing,
    TouchableOpacity,
    Dimensions,
    InteractionManager
} from 'react-native';

import _ from '../../util';

export default class QueryCityComponent extends Component {

    state = {
        left: new Animated.Value(0),
        right: new Animated.Value(0),
        opacity: new Animated.Value(1),
        rotate: new Animated.Value(0)
    }

    innerWidth = 0;
    isSwitch = false;
    animationEnd = false;

    static propTypes = {
        fromCity: PropTypes.object,
        toCity: PropTypes.object,
        toSelectCityPage: PropTypes.func,
        selectCity: PropTypes.func,
        fromKey: PropTypes.string,
        toKey: PropTypes.string
    }

    componentDidUpdate(nextProps, nextState) {
        if (this.isSwitch) {
            InteractionManager.runAfterInteractions(() => {
                Animated.parallel([
                    Animated.timing(nextState.left, {
                        toValue: 0,
                        duration: 200,
                        easing: Easing.in(Easing.linear)
                    }),
                    Animated.timing(nextState.right, {
                        toValue: 0,
                        duration: 200,
                        easing: Easing.in(Easing.linear)
                    }),
                    Animated.timing(nextState.opacity, {
                        toValue: 1,
                        duration: 200,
                        easing: Easing.in(Easing.linear)
                    })
                ]).start();
                this.isSwitch = false;
            });
        }
    }

    shouldComponentUpdate() {
        if (this.isSwitch && !this.animationEnd) {
            const async = async () => {
                const fromLayout = await _.getLayout(this.fromRef);
                const toLayout = await _.getLayout(this.toRef);

                Animated.parallel([
                    Animated.timing(this.state.left, {
                        toValue: this.innerWidth - fromLayout.width,
                        duration: 200,
                        easing: Easing.out(Easing.linear)
                    }),
                    Animated.timing(this.state.right, {
                        toValue: this.innerWidth - toLayout.width,
                        duration: 200,
                        easing: Easing.out(Easing.linear)
                    }),
                    Animated.timing(this.state.opacity, {
                        toValue: 0,
                        duration: 200,
                        easing: Easing.out(Easing.linear)
                    }),
                    Animated.timing(this.state.rotate, {
                        toValue: this.state.rotate._value === 0 ? 1 : 0,
                        duration: 300
                    }),
                ]).start(() => {
                    this.animationEnd = true;
                    // 这个setState并没有什么实际意义,只是为了触发重新rerender
                    this.setState({
                        reupdate: true
                    });
                });
            };

            async();

            return false;
        }

        return true;
    }

    handlePress = () => {
        this.isSwitch = true;
        this.animationEnd = false;
        requestAnimationFrame(() => {
            this.switchCity();
        });
    }

    switchCity = () => {
        const { fromKey, toKey, fromCity, toCity, selectCity } = this.props;

        selectCity({
            [fromKey]: toCity,
            [toKey]: fromCity
        });
    }

    render() {
        const { width } = Dimensions.get('window');
        const { fromCity, toCity, toSelectCityPage, fromKey, toKey } = this.props;
        const { left, right, opacity, rotate } = this.state;

        this.innerWidth = (width - 30) / 2;

        return (
            <View style={styles.query_city}>
                <View style={styles.query_city_item}>
                    <Text style={styles.city_desc}>出发城市</Text>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: scaleSize(40),
                            left,
                            opacity
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                requestAnimationFrame(() => { 
                                    toSelectCityPage(fromKey);
                                });
                            }}
                        >
                            <Text
                                ref={(ref) => {
                                    this.fromRef = ref;
                                }}
                                style={styles.city_txt}
                            >
                                {fromCity.Name}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                <TouchableOpacity
                    onPress={this.handlePress}
                >
                    <Animated.Image
                        style={[
                            styles.image,
                            {
                                transform: [
                                    {
                                        rotate: rotate.interpolate({
                                            inputRange: [
                                                0,
                                                1
                                            ],
                                            outputRange: [
                                                '0deg',
                                                '180deg'
                                            ]
                                        })
                                    }
                                ]
                            }
                        ]}
                        source={require('../../images/change_city.png')}
                    />
                </TouchableOpacity>
                <View style={[
                    styles.query_city_item,
                    { alignItems: 'flex-end' }
                ]}>
                    <Text style={styles.city_desc}>到达城市</Text>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: scaleSize(40),
                            right,
                            opacity
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                requestAnimationFrame(() => {
                                    toSelectCityPage(toKey);
                                });
                            }}
                        >
                            <Text
                                ref={(ref) => {
                                    this.toRef = ref;
                                }}
                                style={styles.city_txt}
                            >
                                {toCity.Name}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    'query_city': {
        flexDirection: 'row',
        height: scaleSize(84),
        marginLeft: scaleSize(15),
        marginRight: scaleSize(15),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#dcdcdc'
    },
    'query_city_item': {
        flex: 1
    },
    'city_desc': {
        fontSize: setSpText(12),
        lineHeight: scaleSize(12),
        color: '#999',
        paddingTop: scaleSize(15),
        paddingBottom: scaleSize(14)
    },
    'city_txt': {
        fontSize: setSpText(28),
        color: '#333',
        lineHeight: scaleSize(28),
        // borderWidth: scaleSize(1),
        // borderColor: '#000',
    },
    'image': {
        width: scaleSize(30),
        height: scaleSize(30),
        position: 'relative',
        top: scaleSize(30)
    }
});
