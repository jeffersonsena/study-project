
import { appDataSource } from "../app-data-source"
import { Logs } from "../entity/Logs"
const amqp = require('amqplib/callback_api')


export default class LogInfo {

  public static async sendLogs(info: any) {

    await amqp.connect(process.env.AMQP_URL, function(error0, connection) {
      if (error0) {
        throw error0
      }
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1
        }

        let queue = 'logsTest'
        let msg = info

      channel.assertQueue(queue, {
        durable: true
      })
      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true
      })

        console.log(" [x] Sent: %s", msg)
      });
      // setTimeout(function() {
      //   connection.close();
      //   process.exit(0);
      // }, 500);
    })
  }

  public static async saveLogs(logInfo: any) {

    // CÓDIGO PARA INSERIR LOG NA TABELA DE LOGS
    const movieReceived = appDataSource.getRepository(Logs).create({ "log_Info": logInfo })
    await appDataSource.getRepository(Logs).save(movieReceived)

    console.log('Log adicionado a tabela!')
  }
  
}
