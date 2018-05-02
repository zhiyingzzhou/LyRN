import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ProfileView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>我的</Text>
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
