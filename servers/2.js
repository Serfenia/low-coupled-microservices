import {publish, listen} from './rabbitmq';

listen('validate_todo', function (todo, options) {
    if (typeof todo.content === 'string' && todo.content.length < 10) {
        todo.invalid_reason = 'Todo content is too small';
        return publish('invalid_todo', {...todo, valid: false}, options);
    }
    publish('vaiid_todo', {...todo, valid: true }, options);
});