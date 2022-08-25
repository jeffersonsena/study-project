
const express = require('express')
// const amqp = require('amqplib/callback_api')
import { Request, Response, Router } from "express"
import { Movies } from "../entity/Movies"
import { appDataSource } from "../app-data-source"
import LogInfo from "./logs-controller"

const routerMovie = express.Router()


// MOVIES PART

routerMovie.get("/", async function (req: Request, res: Response) {

  const list = await appDataSource.getRepository(Movies).find()

  res.send(list)
})

routerMovie.get("/random", async function (req: Request, res: Response) {

  const randomMovie = await appDataSource.createQueryBuilder()
  .select("movies")
  .from(Movies, "movies")
  .orderBy("random()")
  .getRawOne()

  console.log(randomMovie)

  return res.send(`Assista o filme: ${randomMovie.movies_Title.toUpperCase()}`)
  
})

routerMovie.post("/", async function (req: Request, res: Response) {

  const lastIndex = await appDataSource.createQueryBuilder().select('"Index"').from(Movies, "movies").orderBy('"Index"', "DESC").getRawOne()

  const actualIndex = lastIndex.Index + 1

  console.log('Actual Index ->' + actualIndex)

  const movie = await appDataSource.getRepository(Movies).create({
    "index": actualIndex,
    "title": req.body.title
  })
  const results = await appDataSource.getRepository(Movies).save(movie)

  await LogInfo.sendLogs(`Inserted movie - ${req.body.title}`)

  return res.send(results)
})

routerMovie.delete("/:index", async function (req: Request, res: Response) {

  try {
    const resultMovie = appDataSource.getRepository(Movies)

    const deletedMovie = await resultMovie.find({
      where: {
        index: Number(req.params.index)
      }
    })

    const results = await resultMovie.delete(req.params)

    await LogInfo.sendLogs(`Removed movie - ${deletedMovie[0].title}`)

    return res.send(deletedMovie)
    
  } catch (error) {
    console.log(error)
  }

})


/*    POSSIVEIS MELHORIAS   */

// routerMovie.get("/users/:id", async function (req: Request, res: Response) {
//   const results = await appDataSource.getRepository(Himym).findOneBy({
//       id: req.params.id,
//   })
//   return res.send(results)
// })

// routerMovie.put("/users/:id", async function (req: Request, res: Response) {
//   const user = await appDataSource.getRepository(Himym).findOneBy({
//       id: req.params.id,
//   })
//   appDataSource.getRepository(Himym).merge(user, req.body)
//   const results = await appDataSource.getRepository(Himym).save(user)
//   return res.send(results)
// })


export default routerMovie
