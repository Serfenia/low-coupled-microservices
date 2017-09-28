require('babel-core/register');
require('babel-polyfill');
const {publish, subscribe} = require('./rabbitmq');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const server = http.Server(express());
const io = socketIo(server);

let clients = [];

function todoSubscriber(channel) {
    return function(todo, options) {
        const client = clients.find((c) => c.id === options.correlationId);
        if (client) {
            client.emit(channel, todo);
        }
    }
}

const port = process.env.GATEWAY_PORT || 3000;

server.listen(port, () => {

    subscribe('created_todo', todoSubscriber('todo/created'));
    subscribe('invalid_todo', todoSubscriber('todo/invalid'));

    io.sockets.on('connection', (socket) => {
        clients.push(socket);

        socket.on('disconnect', () => {
            clients = clients.filter((c) => c.id === socket.id);
        });

        socket.on('todo/create', (todo) => {
            if (todo.hasOwnProperty('content')) {
                publish('create_todo', { content: todo.content }, { correlationId: socket.id })
            }
        });
    })
});
