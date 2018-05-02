/* eslint-disable no-debugger */
import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import _ from '../../util';

const searchIconWidth = 36;
const searchImageWidth = 28;
const searchCancelWidth = 65;

export default class SearchComponent extends Component {

    state = {
        offsetWidth: 16,
        isFocus: false, // 输入框是否聚焦
        hasContent: false // 输入框是否有内容
    }

    handleFocus = () => {
        this.setState({
            offsetWidth: searchCancelWidth + 8,
            isFocus: true
        });
    }

    handleBlur = () => {
        this.setState({
            offsetWidth: 16,
            isFocus: false
        });
    }

    setContent = (field, val) => {
        this.setState({
            [field]: val
        });
    }

    handleChangeText = (text) => {
        const { hasContent } = this.state;

        text = text.trim();
        if (!hasContent && text.length > 0) {
            this.setContent('hasContent', true);
        }

        if (hasContent && text.length === 0) {
            this.setContent('hasContent', false);
        }
    }

    cleanInput = () => {

        this.setContent('hasContent', false);

        this.handleBlur();

        this._searchInput.clear();
    }

    cancelInput = () => {
        const { hasContent } = this.state;

        if (hasContent) {
            this.cleanInput();
        }

        this.handleBlur();
    }

    render() {
        const
            { width } = Dimensions.get('window'),
            { offsetWidth, isFocus, hasContent } = this.state,
            innerWidth = width - offsetWidth;

        return (
            <View style={[styles.search_wrap]}>
                {/* 搜索输入框开始 */}
                <View style={[
                    styles.search_inner,
                    {
                        width: innerWidth,
                        marginLeft: scaleSize(8)
                    }
                ]}>
                    {/* 搜索图标开始 */}
                    <View style={[styles.search_icon]}>
                        <Image
                            style={styles.search_image}
                            source={require('../../images/search.png')}
                        />
                    </View>
                    {/* 搜索图标结束 */}
                    {/* onBlur={this.handleBlur} */}
                    <TextInput
                        ref={(ref) => {
                            this._searchInput = ref;
                        }}
                        underlineColorAndroid="transparent"
                        onFocus={this.handleFocus}
                        placeholder="北京/beijing/bj"
                        maxLength={30}
                        onChangeText={_.debounce(this.handleChangeText.bind(this), 500)}
                        style={[
                            styles.search_input,
                            { width: innerWidth - searchIconWidth }
                        ]}
                    />
                    {
                        hasContent
                            ? <TouchableOpacity
                                style={styles.search_clear_wrap}
                                onPress={this.cleanInput}
                            >
                                <Image
                                    style={styles.search_clear}
                                    source={require('../../images/clear.png')}
                                />
                            </TouchableOpacity>
                            : null
                    }
                </View>
                {/* 搜索输入框结束 */}
                {/* 取消按钮开始 */}
                {
                    isFocus
                        ? <TouchableOpacity
                            style={styles.search_cancel}
                            onPress={this.cancelInput}
                        >
                            <Text style={{ color: '#2d2d2d' }}>
                                取消
                            </Text>
                        </TouchableOpacity>

                        : null
                }
                {/* 取消按钮结束 */}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    'search_wrap': {
        height: scaleSize(56),
        justifyContent: 'center',
        backgroundColor: '#ededed'
    },
    'search_inner': {
        flexDirection: 'row',
        height: scaleSize(40),
        backgroundColor: '#FFF',
        borderRadius: 5
    },
    'search_icon': {
        width: searchIconWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    'search_image': {
        width: searchImageWidth,
        height: scaleSize(28)
    },
    'search_input': {
        padding: scaleSize(0),
        fontSize: setSpText(14),
        height: scaleSize(40)
    },
    'search_clear_wrap': {
        position: 'absolute',
        right: scaleSize(10),
        width: scaleSize(20),
        height: scaleSize(40),
        alignItems: 'center'
    },
    'search_clear': {
        width: scaleSize(20),
        height: scaleSize(20),
        top: scaleSize(10)
    },
    'search_cancel': {
        position: 'absolute',
        height: scaleSize(40),
        width: searchCancelWidth,
        right: scaleSize(0),
        justifyContent: 'center',
        alignItems: 'center'
    }
});
