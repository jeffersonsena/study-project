// import 'reflect-metadata'
// import { JsonController, Get } from 'routing-controllers'
// import { Himym } from "../entity/Himym"
// import { RiandMo } from "../entity/RiandMo"
// import { Friends } from "../entity/Friends"
// import { appDataSource } from "../app-data-source"


// @JsonController('/series')
// export class SeriesController {

//   // HOW I MET YOUR MOTHER
//   @Get('/himym')
//   async getAllHIMYM() {

//     const list = await appDataSource.getRepository(Himym).find()

//     return list
//   }

//   @Get('/himym/random')
//   async getRandomHIMYM() {

//     const indexRad = Math.floor(Math.random() * 208 + 1)

//     const results = await appDataSource.getRepository(Himym).find({
//       where: {
//         index: indexRad
//       }
//     })

//     return `Assista o episódio: ${results[0].title.toUpperCase()} -  E${results[0].ep} | S${results[0].season}`
//   }


//   // FRIENDS
//   @Get('/friends')
//   async getAllFriends() {

//     const list = await appDataSource.getRepository(Friends).find()

//     return list
//   }

//   @Get('/friends/random')
//   async getRandomFriends() {

//     const indexRad = Math.floor(Math.random() * 236 + 1)

//     const results = await appDataSource.getRepository(Friends).find({
//       where: {
//         index: indexRad
//       }
//     })

//     return `Assista o episódio: ${results[0].title.toUpperCase()} -  E${results[0].ep} | S${results[0].season}`
//   }


//   // RICK AND MORTY
//   @Get('/rickmorty')
//   async getAllRickAndMorty() {

//     const list = await appDataSource.getRepository(RiandMo).find()

//     return list
//   }

//   @Get('/rickmorty/random')
//   async getRandomRickAndMorty() {

//     const indexRad = Math.floor(Math.random() * 51 + 1)

//     const results = await appDataSource.getRepository(RiandMo).find({
//       where: {
//         index: indexRad
//       }
//     })

//     return `Assista o episódio: ${results[0].title.toUpperCase()} -  E${results[0].ep} | S${results[0].season}`
//   }
// }
