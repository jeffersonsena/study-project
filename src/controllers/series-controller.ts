
const express = require("express")
import { Request, Response } from "express"
import { Himym } from "../entity/Himym"
import { RiandMo } from "../entity/RiandMo"
import { Friends } from "../entity/Friends"
import { appDataSource } from "../app-data-source"


// register routes
const routerSeries = express.Router()

// INITIAL PAGE
routerSeries.get("/", async function (req: Request, res: Response) {

  const list = `Séries disponíveis no momento:  Friends (/friends)  | How I Met Your Mother (/himym)  | Rick and Morty (/rickmorty)`

  res.send(list)
})


// HOW I MET YOUR MOTHER
routerSeries.get("/himym", async function (req: Request, res: Response) {

  const list = await appDataSource.getRepository(Himym).find()

  res.send(list)
})

routerSeries.get("/himym/random", async function (req: Request, res: Response) {

  const indexRad = Math.floor(Math.random() * 208 + 1)

  const results = await appDataSource.getRepository(Himym).find({
    where: {
      index: indexRad
    }
  })

  return res.send(`Assista o episódio: ${results[0].title.toUpperCase()} -  E${results[0].ep} | S${results[0].season}`)
  
})


// RICK AND MORTY
routerSeries.get("/rickmorty", async function (req: Request, res: Response) {

  const list = await appDataSource.getRepository(RiandMo).find()

  res.send(list)
})

routerSeries.get("/rickmorty/random", async function (req: Request, res: Response) {

  const indexRad = Math.floor(Math.random() * 51 + 1)

  const results = await appDataSource.getRepository(RiandMo).find({
    where: {
      index: indexRad
    }
  })

  return res.send(`Assista o episódio: ${results[0].title.toUpperCase()} -  E${results[0].ep} | S${results[0].season}`)
})


// FRIENDS
routerSeries.get("/friends", async function (req: Request, res: Response) {

  const list = await appDataSource.getRepository(Friends).find()

  res.send(list)
})

routerSeries.get("/friends/random", async function (req: Request, res: Response) {

  const indexRad = Math.floor(Math.random() * 236 + 1)

  const results = await appDataSource.getRepository(Friends).find({
    where: {
      index: indexRad
    }
  })

  return res.send(`Assista o episódio: ${results[0].title.toUpperCase()} -  E${results[0].ep} | S${results[0].season}`)
})

export default routerSeries