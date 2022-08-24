
const express = require('express')
// const amqp = require('amqplib/callback_api')
import { Request, Response, Router } from "express"
import { Movies } from "../entity/Movies"
import { appDataSource } from "../app-data-source"


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


  // amqp.connect(process.env.AMQP_URL, function(error0, connection) {
  //   if (error0) {
  //     throw error0;
  //   }
  //   connection.createChannel(function(error1, channel) {
  //     if (error1) {
  //       throw error1;
  //     }

  //     let queue = 'hello';
  //     let msg = req.body;

  //     channel.assertQueue(queue, {
  //       durable: false
  //     });
  //     channel.sendToQueue(queue, Buffer.from(JSON.stringify(randomMovie)));

  //     console.log(" [x] Sent %s", randomMovie);
  //   });
  //   // setTimeout(function() {
  //   //   connection.close();
  //   //   process.exit(0);
  //   // }, 500);
  // })


  return res.send(`Assista o filme: ${randomMovie.movies_Title.toUpperCase()}`)
  // return res.send(randomMovie)
  
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
  return res.send(results)
})

routerMovie.delete("/:index", async function (req: Request, res: Response) {

  try {
    const results = await appDataSource.getRepository(Movies).delete(req.params)

    return res.send(results)
    
  } catch (error) {
    console.log(error)
  }

})

// routerMovie.get("/users/:id", async function (req: Request, res: Response) {
//   const results = await appDataSource.getRepository(Himym).findOneBy({
//       id: req.params.id,
//   })
//   return res.send(results)
// })

// routerMovie.post("/users", async function (req: Request, res: Response) {
//   const user = await appDataSource.getRepository(Himym).create(req.body)
//   const results = await appDataSource.getRepository(Himym).save(user)
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
