import axios from 'axios';
import _ from '../util';

export const ajaxByGet = async (uri, params, callback) => {
    callback = _.isFunction(params) ? params : callback;
    params = params && !_.isFunction(params) ? params : {};

    let response;

    try {
        response = await axios.get(uri, {
            params
        });
        if (callback) {
            callback(response.data);
        }
    } catch (e) {
        console.warn(e.message);
        
        if (e.response) {
            console.log(e.response);
        }
        if (e.request) {
            console.log(e.request);
        }
    }
};

