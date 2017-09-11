require('babel-core/register');
require('babel-polyfill');

const {publish, listen} = require('./rabbitmq');

listen('validate_todo', function (todo, options) {
    if (typeof todo.content === 'string' && todo.content.length < 10) {
        todo.invalid_reason = 'Todo content is too small';
        todo.valid = false;
        return publish('invalid_todo', todo, options);
    }
    todo.valid = true;
    publish('valid_todo', todo, options);
});