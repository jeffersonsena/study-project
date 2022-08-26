
const express = require('express')
const amqp = require('amqplib/callback_api')
import { Request, Response } from "express"
import { appDataSource } from "./app-data-source"
import LogInfo from "./controllers/logs-controller"
import routerMovie from "./controllers/movies-controller"
import routerSeries from "./controllers/series-controller"
// import { createExpressServer } from "routing-controllers"
// import { MoviesController } from './controllers/moviesController'
// import { SeriesController } from './controllers/seriesController'
// import { LogsController } from './controllers/logsController'


// create and setup express app
const app = express()
app.use(express.json())

// const app = createExpressServer({
//   controllers: [MoviesController, SeriesController, LogsController]
// })

app.use('/movies', routerMovie)
app.use('/series', routerSeries)


// Especial Medi
app.get("/medi", async function (req: Request, res: Response) {

  res.send('Te amo bb!! ❤️😍')
})


// START AMQP-WORKER
amqp.connect(process.env.AMQP_URL, function(error0, connection) {
  if (error0) {
    throw error0
  }
  connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1
      }

      var queue = 'logsTest'

      channel.assertQueue(queue, {
        durable: true
      })

      channel.prefetch(1)
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)

      channel.consume(queue, async function(msg) {
        console.log(" [x] Received %s", msg.content)

        const logSaved = await LogInfo.saveLogs(msg.content.toString())

        console.log(logSaved)

        setTimeout(function() {
          console.log(" [x] Done")
          channel.ack(msg)
      }, 500)

      }, {
        noAck: false
      })
  })
})



// establish database connection
appDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!")
}).catch((err) => {console.error("Error during Data Source initialization:", err)})


export default app
