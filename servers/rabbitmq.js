import amqp from 'amqplib';


export function publish(queue, message, options) {
    amqp.connect('amqp://localhost').then(function(conn) {
        conn.createChannel().then(function(ch) {
            ch.assertQueue(queue, {durable: false});
            console.log("Payload sent:", `- [${queue}] -`, JSON.stringify(message));
            ch.sendToQueue(queue, new Buffer(JSON.stringify(message)), options);
        }).catch(function(err) {
            console.error('Error on creating RabbitMQ channel', err);
        });
    }).catch(function(err) {
        console.error('Error on connecting to RabbitMQ', err);
    });
}

export function subscribe(queue, callback) {
    amqp.connect('amqp://localhost').then(function(conn) {
        conn.createChannel().then(function(ch) {
            ch.assertQueue(queue, {durable: false});
            ch.consume(queue, function(message) {
                const payload = JSON.parse(message.content.toString());
                try {
                    console.log("Received payload: ", `- [${queue}] -`, message.content.toString());
                    callback(payload, message.properties);
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