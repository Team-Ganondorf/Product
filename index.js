const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => { response.json({ info: 'U did it :)' })})

app.get('/products', db.getProducts)

app.get('/products/:id/', db.getProductById)

app.get('/products/:id/styles', db.getProductStyle)

app.get('/products/:id/related', db.getRelatedProducts)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})