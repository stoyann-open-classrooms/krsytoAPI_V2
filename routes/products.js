const express = require('express')

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productPhotoUpload,
  findProductByCodeBarre,
  getAveragePrice, 
} = require('../controllers/Products')

const priceReccordRouter = require('./priceReccord')

const router = express.Router({ mergeParams: true })

const { protect, authorize } = require('../middlewares/auth')

const Product = require('../models/Product')

const advancedResults = require('../middlewares/advancedResults')

router.use('/:productId/priceReccords', priceReccordRouter)

router
  .route('/')
  .get(
    advancedResults(Product, {
      path: 'plasticTypes productCategory garbageTypes nutriScore ecoScore additives novaScore',
    }),
    getProducts,
  )
  .post(createProduct)

router
  .route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct)

router.route('/:id/photo').put(productPhotoUpload)

// New route to find a recyclable product by bar code
router.route('/codeBarre/:codeBarre').get(findProductByCodeBarre)

// New route to get the average price of a product
router.route('/:id/average-price').get(getAveragePrice)

module.exports = router
