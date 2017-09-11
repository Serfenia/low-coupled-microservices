require('babel-core/register');
require('babel-polyfill');
const {publish, listen} = require('./rabbitmq');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const server = http.Server(express());
const io = socketIo(server);
const todos = [];

let clients = [];

function listenToValidatedTodos(channel) {
    return function(todo, options) {
        const client = clients.find((c) => c.id === options.correlationId);
        if (client) {
            client.emit(channel, todo);
        }
    }
}

const port = process.env.GATEWAY_PORT || 3000;

server.listen(port, () => {

    listen('valid_todo', listenToValidatedTodos('todos/valid'));
    listen('invalid_todo', listenToValidatedTodos('todos/invalid'));

    io.sockets.on('connection', (socket) => {
        clients.push(socket);

        socket.on('disconnect', () => {
            clients = clients.filter((c) => c.id === socket.id);
        });

        socket.on('todos/search', (filters) => {
            const result = todos.filter((todo) => {
                return filters.search === '' || todo.content.toLowerCase().indexOf(filters.search.toLowerCase()) !== -1;
            });
            socket.emit('todos', result);
        });
        socket.on('todos/create', (todo) => {
            if (todo.hasOwnProperty('content')) {
                publish('create_todo', { content: todo.content }, { correlationId: socket.id })
            }
        });
        socket.on('todos/destroy', (id) => {
            publish('destroy_todo', { id: id }, { correlationId: socket.id })
        });
    })
});
