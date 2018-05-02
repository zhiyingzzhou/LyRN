import { handleAction } from 'redux-actions';
import { combineReducers } from 'redux';
import { selectCity, selectDate } from '../actions';
import date from '../util/date';

const tripTime = date.format(date.getTomorrow());

const City = handleAction(
    selectCity, 
    (state, { payload }) => Object.assign({}, state, { ...payload }), 
    { 
        trainFromCity: { Name: '上海' }, 
        trainToCity: { Name: '北京' },
        flightFromCity: { Name: '上海' }, 
        flightToCity: { Name: '北京' },
        busFromCity: { Name: '上海' }, 
        busToCity: { Name: '北京' }
    }
);

const Date = handleAction(
    selectDate, 
    (state, { payload }) => Object.assign({}, state, { ...payload }), 
    { 
        trainTripTime: tripTime, 
        trainTripTimeDesc: '明日出发',
        flightTripTime: tripTime, 
        flightTripTimeDesc: '明日出发',
        busTripTime: tripTime, 
        busTripTimeDesc: '明日出发'
    }
);

const AppReducer = combineReducers({
    City, 
    Date
});

export default AppReducer;
