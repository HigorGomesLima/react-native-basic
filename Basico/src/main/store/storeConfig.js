import { compose, applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import loadReducer from './reducers/load';
import userReducer from './reducers/user';

const reducers = combineReducers({
    load: loadReducer,
    user: userReducer
});

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)));
}

export default storeConfig;