const express = require('express')
const {
  getProductCategories,
  getProductCategory,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
} = require('../controllers/productCategories')

const router = express.Router()
const ProductCategory = require('../models/Product')
const advancedResults = require('../middlewares/advancedResults')

router
  .route('/')
  .get(
    advancedResults(ProductCategory ),
    getProductCategories,
  )
  .post(createProductCategory)
router
  .route('/:id')
  .get(getProductCategory)
  .put(updateProductCategory)
  .delete(deleteProductCategory)

module.exports = router
