import store from './../store';
import { addValidTodo } from './../actions/todos';
import { notifyError, notifySuccess } from './../actions/notifications';

export default function (socket) {
    socket.on('todo/created', (todo) => {
        store.dispatch(addValidTodo(todo));
        store.dispatch(notifySuccess('Todo has been added.'));
    });
    socket.on('todo/invalid', (todo) => {
        store.dispatch(notifyError(`Invalid todo: ${todo.invalid_reason}`));
    });
}
