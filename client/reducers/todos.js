export function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_VALID_TODO':
            return [...state, action.todo];
        case 'REFRESH_TODOS':
            return action.todos;
            break;
        default: return state;
    }
}