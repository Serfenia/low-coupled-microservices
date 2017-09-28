require('babel-core/register');
require('babel-polyfill');

const {publish, subscribe} = require('./rabbitmq');

subscribe('create_todo', function (form, options) {
    const date = new Date();
    const todo = {
        id: date.getTime(), // Some random id
        content: form.content,
        status: 'draft'
    };
    publish('validate_todo', todo, options);
});

subscribe('valid_todo', function (todo, options) {
    todo.created_at = new Date();
    todo.status = 'created';
    publish('created_todo', todo, options);
});