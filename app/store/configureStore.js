import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducer';

const rootSaga = createSagaMiddleware();

const rootStore = createStore(
    rootReducer,
    applyMiddleware(
        rootSaga
    )
);

// rootSaga.run();

export default rootStore;
