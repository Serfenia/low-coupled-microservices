export function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_VALID_TODO':
            return [...state, action.todo];
        case 'REFRESH_TODOS':
            return action.todos;
            break;
        case 'DELETE_TODO':
            return [...state.filter((t, index) => index !== action.index)];
            break;
        default: return state;
    }
}