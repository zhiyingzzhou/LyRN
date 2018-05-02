import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';

import _ from '../util';

export default class ListItemComponent extends Component {

    static defaultProps = {
        data: {}
    }

    static propTypes = {
        data: PropTypes.object
    }

    _renderItem(list, item, index) {
        const { data: { borderRadius = 3 } } = this.props;
        const { 
            style = {}, // 行样式
            title = '', 
            titleStyle = {}, 
            after = '', 
            afterStyle = {},
            iconStyle = {},
            linkIcon = true, // 是否显示肩头
            iconDirection = 'right', // 箭头方向
            onPress 
        } = item;

        // 如果list元素大于1,第一个元素添加上边radius,最后一个元素添加下边radius
        let borderRadiusStyle;

        if (list.length > 1) {
            borderRadiusStyle = index === 0 ? {
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius
            } : index === list.length - 1 ? {
                borderBottomLeftRadius: borderRadius, 
                borderBottomRightRadius: borderRadius
            } : {};
        } else {
            borderRadiusStyle = { borderRadius };
        }

        return (
            <View key={index} >
                <TouchableOpacity 
                    style={[
                        styles.item_inner,
                        {
                            paddingRight: linkIcon ? 0 : 5
                        },
                        borderRadiusStyle,
                        style
                    ]}
                    onPress={() => {
                        requestAnimationFrame(() => {
                            if (onPress) {
                                onPress();
                            }
                        });
                    }}
                    activeOpacity={_.isFunction(onPress) ? 0.8 : 1}
                >
                    <View style={styles.item_content}>
                        {title.props 
                            ? title 
                            : <Text style={[
                                styles.item_title,
                                titleStyle
                            ]}>{title}</Text>
                        }
                        {after.props 
                            ? after
                            : <Text style={[
                                styles.item_after,
                                afterStyle
                            ]}>{after}</Text>
                        }
                    </View>
                    {
                        linkIcon && 
                        <View style={styles.item_icon}>
                            <View style={[
                                styles.icon,
                                iconStyle,
                                {
                                    transform: [
                                        {
                                            rotateZ: iconDirection === 'right' ? '-45deg' : '45deg'
                                        }
                                    ]
                                }
                            ]}></View>
                        </View>
                    }
                </TouchableOpacity>
                {list.length > 1 && index < list.length - 1 && <View style={{
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: '#eee'
                }}></View>}
            </View>
        );
    }

    render() {
        const { data: { style = {}, list = [], borderRadius = 3 } } = this.props;
        
        return (
            <View style={[
                styles.wrapper,
                style,
                {
                    borderRadius,
                    shadowRadius: borderRadius
                }
            ]}>
                {list.map(this._renderItem.bind(this, list))}
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: scaleSize(10),
        marginLeft: scaleSize(5), 
        marginRight: scaleSize(5),
        padding: scaleSize(0),
        shadowColor: '#eee',
        shadowOpacity: 1,
        shadowOffset: { width: 1, 
            height: 1 }
    },
    'item_inner': {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: scaleSize(15),
        backgroundColor: '#FFF',
        ...Platform.select({
            ios: {
                height: scaleSize(44)
            },
            android: {
                height: scaleSize(50),
            }
        })
    },
    'item_content': {
        flex: 9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    'item_title': {
        fontSize: setSpText(16),
        color: '#666'
    },
    'item_after': {
        fontSize: setSpText(14),
        color: '#CCC',
    },
    'item_icon': {
        flex: 1,
        justifyContent: 'center',
    },
    icon: {
        width: scaleSize(8),
        height: scaleSize(8),
        marginLeft: scaleSize(8),
        borderRightWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#BCBBB8',
        
    }
});
