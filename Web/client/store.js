import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk'
//import root reducer
import rootReducer from './reducers/index';

const defaultState = {
    comments: [],
    posts: []
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, defaultState, composeEnhancers(applyMiddleware(thunkMiddleware)));
export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextReducer = require('./reducers/index').default;
        store.replaceReducer(nextReducer);
    });
}
