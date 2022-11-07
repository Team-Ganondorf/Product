const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  password: 'suckgres',
  port: 5432,
})

const getProducts = (request, response) => {
  pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProductById = (request, response) => {
  const id = parseInt(request.params.id)

  //join product and features

  pool.query(`SELECT * FROM public.features WHERE product_id =  ${id}
  ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

}

const getProductStyle = (request, response) => {

  //join style and sku and photos
  const id = parseInt(request.params.id)

  pool.query(`SELECT * FROM public.related WHERE id = ${id}`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRelatedProducts = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query(`SELECT * FROM public.related WHERE id = ${id}`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


module.exports = {
  getProductById,
}


// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'sdc',
//   password: 'suckgres',
//   port: 5432,
// })

// const { Client } = require('pg')
// const client = new Client()
// await client.connect()
// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message) // Hello world!
// await client.end()

// const getProducts = (request, response) => {
//   pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// const getProductById = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('SELECT * FROM features WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// const getRelatedProducts = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('SELECT * FROM related WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// module.exports = {
//   getProducts,
//   getProductById,
//   getRelatedProducts,
// }