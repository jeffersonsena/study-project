import app from './app'
import 'reflect-metadata'

const port = process.env.PORT || 3000


// initial test
app.get('/', (req, res) => {
  res.send('Estamos ON!')
})


// start express server
app.listen(port, () => {
  console.log(`Running server on port ${port}`)
})
