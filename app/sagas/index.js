import { call, put, takeEvery } from 'redux-saga/effects';
import * as requests from '../actions/http';

function *getBanner() {
    try {
        const res = yield call();
    } catch (e) {
        
    }
}

export default function *rootSaga() {
    yield takeEvery(requests.getBanner.toString(), getBanner);
}
