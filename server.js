const express = require('express');
const cors = require('cors');
const amqp = require('amqplib/callback_api');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/tasks', (req, res) => {
  const inputNumber = req.body.number;

  amqp.connect('amqp://localhost', (err, conn) => {
    if (err) {
      res.status(500).send('Error connecting to RabbitMQ');
      return;
    }

    conn.createChannel((err, ch) => {
      if (err) {
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

app.listen(4000, () => console.log('Server running on port 4000'));


app.get('/result', (req, res) => {
    console.log('Received GET request to /result');
    amqp.connect('amqp://localhost', (err, conn) => {
      if (err) {
        console.error('Error connecting to RabbitMQ:', err);
        res.status(500).send('Error connecting to RabbitMQ');
        return;
      }

      conn.createChannel((err, ch) => {
        if (err) {
          console.error('Error creating channel:', err);
          res.status(500).send('Error creating channel');
          return;
        }

        const q = 'result_queue';
        ch.assertQueue(q, {durable: false});

        ch.get(q, {noAck: true}, (err, msg) => {
          if (err || !msg) {
            res.status(500).send('Error retrieving result');
            return;
          }

          const result = JSON.parse(msg.content.toString()).result;
          console.log('Received result from RabbitMQ:', result);
          res.status(200).send(result.toString());
        });
      });
    });
  });

