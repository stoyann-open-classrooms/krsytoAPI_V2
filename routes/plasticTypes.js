const express = require('express')
const {
  getPlasticType,
  createPlasticType,
  deletePlasticType,
  updatePlasticType,
  getPlasticTypes,
  uploadPlasticTypePhoto,
} = require('../controllers/plasticTypes')
const router = express.Router()
const { protect, authorize } = require('../middlewares/auth')
const PlasticType = require('../models/PlasticType')
const advancedResults = require('../middlewares/advancedResults')

router
  .route('/')
  .get(advancedResults(PlasticType), getPlasticTypes)
  .post(createPlasticType)

router
  .route('/:id')
  .get(getPlasticType)
  .delete(deletePlasticType)
  .put(updatePlasticType)

router.route('/:id/icone').put(uploadPlasticTypePhoto)

module.exports = router
