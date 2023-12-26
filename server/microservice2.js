const amqp = require('amqplib/callback_api');
const logger = require('./logger');

amqp.connect('amqp://localhost', (err, conn) => {
  if (err) {
    logger.error('Error connecting to RabbitMQ', err);
    return;
  }

  conn.createChannel((err, ch) => {
    if (err) {
      logger.error('Error creating channel', err);
      return;
    }

    const q = 'task_queue';
    ch.assertQueue(q, {durable: false});

    logger.info('Microservice M2 waiting for messages in queue', q);

    ch.consume(q, (msg) => {
      const task = JSON.parse(msg.content.toString());
      const number = task.number;

      // Симулируем задержку 5 секунд
      setTimeout(() => {
        const result = number * 2; // Результат который получили удваиваем

        logger.info(`Processed task. Result: ${result}`);

        // отправляем результат обратно в RabbitHQ
        const resultQueue = 'result_queue';
        ch.assertQueue(resultQueue, {durable: false});
        ch.sendToQueue(resultQueue, Buffer.from(JSON.stringify({result: result})));
      }, 5000);
    }, {noAck: true});
  });
});


logger.info('Microservice 2 listening on port 3001');
