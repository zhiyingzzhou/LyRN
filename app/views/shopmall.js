import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ShopMallView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>商城页</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: '#FFF' 
    } 
});
