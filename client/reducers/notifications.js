export function notification(state = { message: '', error: false }, action) {
    switch (action.type) {
        case 'NOTIFY_ERROR':
            return { message: action.message, error: true };
        case 'NOTIFY_SUCCESS':
            return { message: action.message, error: false };
        default: return state;
    }
}