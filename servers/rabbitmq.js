import amqp from 'amqplib';


export function publish(queue, message, options) {
    amqp.connect('amqp://localhost').then(function(conn) {
        conn.createChannel().then(function(ch) {
            ch.assertQueue(queue, {durable: false});
            ch.sendToQueue(queue, JSON.stringify(message), options);
        }).catch(function(err) {
            console.error('Error on creating RabbitMQ channel', err);
        });
    }).catch(function(err) {
        console.error('Error on connecting to RabbitMQ', err);
    });
}

export function listen(queue, callback) {
    amqp.connect('amqp://localhost').then(function(conn) {
        conn.createChannel().then(function(ch) {
            ch.assertQueue(queue, {durable: false});
            ch.consume(queue, function(message, options) {
                try {
                    callback(JSON.parse(message), options);
                } catch(error) {
                    console.error('Error on parsing json: ', error);
                }
            }, {noAck: true});
        }).catch(function(err) {
            console.error('Error on creating RabbitMQ channel', err);
        });
    }).catch(function(err) {
        console.error('Error on connecting to RabbitMQ', err);
    });
}