require('babel-core/register');
require('babel-polyfill');

const {publish, listen} = require('./rabbitmq');

listen('create_todo', function (form, options) {
    const date = new Date();
    const todo = {
        id: date.getTime(), // Some random id
        content: form.content,
        created_at: date
    };
    publish('validate_todo', todo, options);
});