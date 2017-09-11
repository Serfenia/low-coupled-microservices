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

let middleware = null;
if (window.devToolsExtension) {
    middleware = window.devToolsExtension();
} else {
    middleware = null;
}

const store = createStore(rootReducer, defaultState, middleware);
export default store;
