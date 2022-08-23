
import 'reflect-metadata'
const amqp = require('amqplib/callback_api')
import { JsonController, Body, Get, Post, Delete } from 'routing-controllers'
import { Movies } from "../entity/Movies"
import { appDataSource } from "../app-data-source"


@JsonController()
export class MoviesController {
  @Get('/movies')
  getAll() {

    const list = appDataSource.getRepository(Movies).find()

    return list;
  }

  @Get('/movies/random')
  async getRandom() {

    const randomMovie = await appDataSource.createQueryBuilder()
    .select("movies")
    .from(Movies, "movies")
    .orderBy("random()")
    .getRawOne()

    console.log(randomMovie)

    await amqp.connect('amqps://nwlrexpz:cQhwbkETvUQnxASl5LixDQ7YzGzVRD9X@jackal.rmq.cloudamqp.com/nwlrexpz', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }

      let queue = 'hello';
      // let msg = req.body;

      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(randomMovie)));

      console.log(" [x] Sent %s", randomMovie);
    });
    // setTimeout(function() {
    //   connection.close();
    //   process.exit(0);
    // }, 500);
  })

    return `Assista o filme: ${randomMovie.movies_Title.toUpperCase()}`
  }

  @Post('/movies')
  async addNewMovie(@Body() title: any) {

    const lastIndex = await appDataSource.createQueryBuilder().select('"Index"').from(Movies, "movies").orderBy('"Index"', "DESC").getRawOne()

    const actualIndex = lastIndex.Index + 1
    console.log('Actual Index ->' + actualIndex)

    const movie = await appDataSource.getRepository(Movies).create({
      "index": actualIndex,
      "title": title.title
    })

    const results = await appDataSource.getRepository(Movies).save(movie)

    return results;
  }

  // @Put('/movies/:id')
  // put(@Param('id') id: number, @Body() user: any) {
  //   return 'Updating a user...';
  // }

  @Delete('/movies')
  async removeMovie(@Body() index: number) {

    console.log(index)

    const results = await appDataSource.getRepository(Movies).delete(index)

    return results;
  }
}
