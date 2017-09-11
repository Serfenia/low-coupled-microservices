export function notifyError(message) {
    return {type: 'NOTIFY_ERROR', message};
}

export function notifySuccess(message) {
    return {type: 'NOTIFY_SUCCESS', message};
}
