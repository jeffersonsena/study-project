
const express = require('express')
// const amqp = require('amqplib/callback_api')
import { Request, Response, Router } from "express"


const routerLogs = express.Router()


routerLogs.get("/", async function (req: Request, res: Response) {

  let myLogs = []

    // await amqp.connect(process.env.AMQP_URL, function(error0: any, connection: { createChannel: (arg0: (error1: any, channel: any) => void) => void; }) {
      
    //   if (error0) {
    //     throw error0;
    //   }

    //   connection.createChannel(function(error1: any, channel: { assertQueue: (arg0: string, arg1: { durable: boolean; }) => void; consume: (arg0: string, arg1: (msg: { content: any; }) => void, arg2: { noAck: boolean; }) => void; }) {
    //       if (error1) {
    //         throw error1;
    //       }

    //       var queue = 'hello';

    //       channel.assertQueue(queue, {
    //         durable: false
    //       });

    //       console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    //       channel.consume(queue, function(msg: { content: any; }) {
    //         myLogs.push('push test')
    //         console.log(" [x] Received %s", msg.content);
    //       }, {
    //         noAck: true
    //       });
    //   });
    // });

    myLogs.push('push test 2')

  res.send('Preparando para logs')
})


export default routerLogs