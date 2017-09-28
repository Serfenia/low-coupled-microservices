import { createStore } from 'redux'

import rootReducer from './reducers/index'

function getTodosFromStorage() {
    try {
        const todos = JSON.parse(localStorage.getItem('todos'));
        return todos instanceof Array ? todos : [];
    } catch (err) {
        return [];
    }
}


const defaultState = {
    todos: getTodosFromStorage(),
    notification: {}
};

const store = window.devToolsExtension
    ? createStore(rootReducer, defaultState, window.devToolsExtension())
    : createStore(rootReducer, defaultState);

export default store;
