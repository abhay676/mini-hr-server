import ampqlib from 'amqplib';
import { environment } from '../../config/environment.js';
import { sendMail } from './emailService.js';

const queue = environment.QUEUE;
const open = ampqlib.connect(environment.AMQP_SERVER);

export const publishMessage = (payload) =>
  open
    .then((connection) => connection.createChannel())
    .then((channel) =>
      channel
        .assertQueue(queue, {
          durable: false,
        })
        .then(() =>
          channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)))
        )
    )
    .catch((error) => console.warn(error));

export const consumeMessage = () => {
  open
    .then((connection) => connection.createChannel())
    .then((channel) =>
      channel
        .assertQueue(queue, {
          durable: false,
        })
        .then(() => {
          console.log(
            ' [*] Waiting for messages in %s. To exit press CTRL+C',
            queue
          );
          return channel.consume(queue, (msg) => {
            if (msg !== null) {
              const { OTP, email } = JSON.parse(msg.content.toString());
              console.log(' [x] Received %s'); // send email via aws ses
              sendMail(email, OTP).then(() => {
                channel.ack(msg);
              });
            }
          });
        })
    )
    .catch((error) => console.warn(error));
};
