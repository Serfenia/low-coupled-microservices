import socket from './../socket';
import listeners from './../listeners/todos';

listeners(socket);

export function addValidTodo(todo) {
    return {type: 'ADD_VALID_TODO', todo};
}

export function createTodo(todo) {
    socket.emit('todo/create', todo);
    return {type: 'CREATE_TODO', todo};
}

export function deleteTodo(index) {
    return {type: 'DELETE_TODO', index};
}

