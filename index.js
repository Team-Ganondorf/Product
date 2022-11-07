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

app.get('/', (request, response) => {
  response.json({ info: 'U did it :)' })
})


/*
*   [
      {
        "id": 1,
        "name":
        slogan
        description
        category
        default_price
      },
      {...}
    ]
*/

app.get('/products', db.getProducts)


app.get('/products/:id/', db.getProductById)


app.get('/products/:id/styles', db.getProductById)


app.get('/products/:id/related', db.getProductById)




app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})





// import * as db from './queries.js';

// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express()
// const port = 3000

// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' })
// })

// // app.get('/related', db.getRelatedProducts)


// app.listen(port, () => {
//   console.log(`App running on port ${port}.`)
// })

