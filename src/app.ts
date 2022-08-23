
const express = require('express')
// import { Request, Response } from "express"
import { appDataSource } from "./app-data-source"
// import routerMovie from "./controllers/movies-controller"
// import routerSeries from "./controllers/series-controller"
import { createExpressServer } from "routing-controllers"
import { MoviesController } from './controllers/moviesController'
import { SeriesController } from './controllers/seriesController'
import { LogsController } from './controllers/logsController'


// create and setup express app
// const app = express()
// app.use(express.json())

const app = createExpressServer({
  controllers: [MoviesController, SeriesController, LogsController]
})

// app.use('/movies', routerMovie)
// app.use('/series', routerSeries)

// const port = process.env.PORT || 3000

// establish database connection
appDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!")
}).catch((err) => {console.error("Error during Data Source initialization:", err)})


export default app
