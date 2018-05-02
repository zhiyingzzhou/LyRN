import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    InteractionManager
} from 'react-native';
import CalendarHeaderPage from '../components/calendar/calendar_header';
import CalendarMonthComponent from '../components/calendar/calendar_month';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectDate } from '../actions';

import createCalendar from '../util/createCalendar';

import date from '../util/date';

class CalenDarPage extends Component {

    childContextTypes = {
        navigation: PropTypes.object
    }

    getChildContext = {
        navigation: this.props.navigation 
    }

    dayMap = {
        [date.getToday()]: '今天',
        [date.getTomorrow()]: '明天',
        [date.getAfterTomorrow()]: '后天'
    }

    static propTypes = {
        selectDate: PropTypes.func,
        navigation: PropTypes.object
    }

    state = {
        calendar: []
    }

    componentWillMount() {
        this.setState({
            calendar: createCalendar.init()
        });
    }

    handleSelect = (time) => {
        const { navigation, selectDate } = this.props;
        const { key } = navigation.state.params || {};
        
        const dateSpe = date.format(time);
        const description = this.dayMap[time] ? `${this.dayMap[time]}出发` : '';
        // 判断是否从首页进来

        if (key.indexOf('TripTime')) {
            selectDate({
                [key]: dateSpe,
                [`${key}Desc`]: description
            });
        } else {
            selectDate({
                [key]: dateSpe
            });
        }
        InteractionManager.runAfterInteractions(() => {
            navigation.goBack();
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CalendarHeaderPage />
                <CalendarMonthComponent 
                    onSelect={this.handleSelect} 
                    data={this.state.calendar} 
                    dayMap={this.dayMap}
                />
            </View>
        );
    }
}

const mapStateToProps = () => ({
});

const mapActionToProps = (dispatch) => bindActionCreators({ selectDate }, dispatch);
    
export default connect(mapStateToProps, mapActionToProps)(CalenDarPage);
