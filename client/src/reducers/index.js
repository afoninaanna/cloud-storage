import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import appReducer from './appReducer';
import fileReducer from './fileReducer';
import userReducer from './userReducer';

const rootReducers = combineReducers({
    user: userReducer,
    files: fileReducer,
    app: appReducer
});

export const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));