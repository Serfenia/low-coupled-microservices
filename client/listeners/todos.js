import store from './../store';
import { refreshTodos, addValidTodo } from './../actions/todos';
import { notifyError, notifySuccess } from './../actions/notifications';

export default function (socket) {
    socket.on('todos', (todos) => {
        store.dispatch(refreshTodos(todos));
    });
    socket.on('todos/valid', (todo) => {
        store.dispatch(addValidTodo(todo));
        store.dispatch(notifySuccess('Todo has been added.'));
    });
    socket.on('todos/invalid', (todo) => {
        store.dispatch(notifyError(`Invalid todo: ${todo.invalid_reason}`));
    });
}
