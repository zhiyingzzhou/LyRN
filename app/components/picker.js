import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    Picker,
    Dimensions,
    Animated,
    StyleSheet,
    Easing,
    TouchableOpacity
} from 'react-native';

export default class PickerComponent extends Component {

    static propTypes = {
        pickerData: PropTypes.array.isRequired,
        // selectedValue: PropTypes.string.isRequired,
        pickerConfirmBtnText: PropTypes.string,
        onPickerSelect: PropTypes.func,
        onPickerConfirm: PropTypes.func
    }

    animatedValue = new Animated.Value(0)

    state = {}

    initialSelectedValue = (selectedValue, callback) => {
        this.setState({
            selectedValue
        }, () => {
            callback && callback();
        });
    }

    _animation(value, callback) {
        Animated.timing(this.animatedValue, {
            toValue: value,
            duration: 300,
            easing: Easing.linear
        }).start(() => {
            callback && callback();
        });
    }

    show = () => {
        this._modalRef.setNativeProps({
            style: {
                height: 'auto'
            }
        });
        this._animation(1);
    }

    hide = () => {
        this._animation(0, () => {
            this._modalRef.setNativeProps({
                style: {
                    height: 0
                }
            });
        });
    }

    onPickerSelect = (selectedValue) => {
        const { onPickerSelect } = this.props;

        this.setState({
            selectedValue
        });
        onPickerSelect && onPickerSelect(selectedValue);
    }

    onPickerConfirm = () => {
        const { onPickerConfirm } = this.props;

        onPickerConfirm && onPickerConfirm(this.state.selectedValue);
    }

    render() {
        const { pickerData, pickerConfirmBtnText = '完成' } = this.props;
        const { width } = Dimensions.get('window');

        return (
            <TouchableOpacity 
                style={styles.modal}
                ref={(ref) => {
                    this._modalRef = ref;
                }}
                onPress={this.hide}
            >
                <Animated.View style={{
                    position: 'absolute',
                    bottom: this.animatedValue.interpolate({
                        inputRange: [
                            0, 
                            1
                        ],
                        outputRange: [
                            scaleSize(-260), 
                            0
                        ]
                    })
                }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            styles.picker_toolbar,
                            {
                                width
                            }
                        ]}
                    >
                        <TouchableOpacity
                            onPress={this.onPickerConfirm}
                        >
                            <Text style={styles.confirm_text}>{pickerConfirmBtnText}</Text>
                        </TouchableOpacity> 
                    </TouchableOpacity>
                    <Picker
                        style={{
                            width,
                            backgroundColor: '#cfd5da',
                        }}
                        itemStyle={{
                            height: scaleSize(216)
                        }}
                        selectedValue={this.state.selectedValue}
                        onValueChange={this.onPickerSelect}
                    >
                        {pickerData.map((item, index) => 
                            <Picker.Item key={index} label={item} value={item} />
                        )}
                    </Picker>
                </Animated.View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    'modal': {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: 0,
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
    'picker_toolbar': {
        height: scaleSize(44),
        backgroundColor: '#f7f7f8',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#929499',
        paddingRight: scaleSize(15),
        paddingLeft: scaleSize(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    'confirm_text': {
        fontSize: setSpText(17),
        color: '#007aff'
    }
});
