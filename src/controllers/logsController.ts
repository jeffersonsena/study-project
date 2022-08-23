
import 'reflect-metadata'
const amqp = require('amqplib/callback_api')
import { JsonController, Get } from 'routing-controllers'


@JsonController()
export class LogsController {

  @Get('/logs')
  async getAllLogs() {

    let myLogs = []

    await amqp.connect('amqps://nwlrexpz:cQhwbkETvUQnxASl5LixDQ7YzGzVRD9X@jackal.rmq.cloudamqp.com/nwlrexpz', function(error0: any, connection: { createChannel: (arg0: (error1: any, channel: any) => void) => void; }) {
      
      if (error0) {
        throw error0;
      }

      connection.createChannel(function(error1: any, channel: { assertQueue: (arg0: string, arg1: { durable: boolean; }) => void; consume: (arg0: string, arg1: (msg: { content: any; }) => void, arg2: { noAck: boolean; }) => void; }) {
          if (error1) {
            throw error1;
          }

          var queue = 'hello';

          channel.assertQueue(queue, {
            durable: false
          });

          console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

          channel.consume(queue, function(msg: { content: any; }) {
            myLogs.push('push test')
            console.log(" [x] Received %s", msg.content);
          }, {
            noAck: true
          });
      });
    });

    myLogs.push('push test 2')

    return myLogs;
  }

}
