const express = require('express')

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productPhotoUpload,
  findProductByCodeBarre, // Ajout de la nouvelle méthode
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

// Nouvelle route pour trouver un produit recyclable par code barre
router.route('/codeBarre/:codeBarre').get(findProductByCodeBarre)

module.exports = router
