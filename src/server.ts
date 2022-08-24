
import 'dotenv/config'
import app from './app'
import 'reflect-metadata'


require('dotenv').config()

const port = process.env.PORT || 3000

// initial test
app.get('/', (req, res) => {
  res.send('Application ON! 💻')
})


// start express server
app.listen(port, () => {
  console.log(`🏃 Running server on port ${port}`)
})
