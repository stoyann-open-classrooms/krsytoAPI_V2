const express = require('express')
const { createProductFamilly, getProductFamilly, getProductFamilies, updateProductFamilly, deleteProductFamilly } = require('../controllers/productFamilly')
const ProductFamilly = require('../models/ProductFamilly')

const router = express.Router()

const advancedResults = require('../middlewares/advancedResults')

router
  .route('/')
  .get(
    advancedResults(ProductFamilly ),
    getProductFamilies,
  )
  .post(createProductFamilly)
router
  .route('/:id')
  .get(getProductFamilly)
  .put(updateProductFamilly)
  .delete(deleteProductFamilly)

module.exports = router
