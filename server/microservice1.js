const express = require('express');
const amqp = require('amqplib/callback_api');
const logger = require('./logger');
const app = express();
app.use(express.json());

app.post('/tasks', (req, res) => {
  const inputNumber = req.body.number;

  logger.info(`Received a new task with number: ${inputNumber}`);

  amqp.connect('amqp://localhost', (err, conn) => {
    if (err) {
      logger.error('Error connecting to RabbitMQ', err);
      res.status(500).send('Error connecting to RabbitMQ');
      return;
    }

    conn.createChannel((err, ch) => {
      if (err) {
        logger.error('Error creating channel', err);
        res.status(500).send('Error creating channel');
        return;
      }

      const q = 'task_queue';
      ch.assertQueue(q, {durable: false});
      ch.sendToQueue(q, Buffer.from(JSON.stringify({number: inputNumber})));
    });

    res.status(200).send('Request received and sent to RabbitMQ');
  });
});

app.listen(3000, () => logger.info('Microservice M1 listening on port 3000'));
