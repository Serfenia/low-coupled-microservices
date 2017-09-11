import { combineReducers } from 'redux';

import {todos} from './todos';
import {notification} from './notifications';

export default combineReducers({
    todos,
    notification
});
