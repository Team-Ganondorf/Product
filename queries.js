const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  password: 'suckgres',
  port: 5432,
})

const getProducts = (request, response) => {
  pool.query('SELECT * FROM public.products WHERE id < 10', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProductById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query(
    `SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price,
      json_agg(json_build_object('feature', f.feature, 'value', f.value)) AS features
    FROM public.products p
    LEFT JOIN public.features f
      ON p.id = f.product_id
    WHERE p.id = ${id}
    GROUP BY p.id`, (error, results) => {
      if (error) {
        throw error
      }
    response.status(200).json(results.rows[0])
  })

}

const getProductStyle = (request, response) => {

  //join style and sku and photos
  const id = parseInt(request.params.id)
  var responseObj = {
    product_id: id,
  }

  pool.query(
    `SELECT s.id AS style_id, s.name, s.original_price, s.sale_price, s.default_style AS "default?",
    json_agg(json_build_object('thumbnail_url', p.thumbnail, 'url', p.url)) AS photos,
    json_object_agg(sku.id, json_build_object('quantity', sku.quantity, 'size', sku.size)) AS skus
    FROM public.styles s
    LEFT JOIN public.photos p
      ON s.id = p.styleId
    LEFT JOIN public.skus sku
      ON s.id = sku.styleId
    where s.productId = ${id}
    GROUP BY s.id`, (error, results) => {
    if (error) {
      throw error
    }
    responseObj['results'] = results.rows;
    response.status(200).json(responseObj)
  })
}

const getRelatedProducts = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query(
    `SELECT array_agg(related_product_id) FROM public.related WHERE current_product_id = ${id}`,
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows[0]["array_agg"])
    })
}

module.exports = {
  getProducts,
  getProductById,
  getProductStyle,
  getRelatedProducts
}