const express = require('express')

const { getMarques, getMarque, updateMarque, deleteMarque, marquePhotoUpload, createMarque } = require('../controllers/marques')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const Marque = require('../models/Marque')
const advancedResults = require('../middlewares/advancedResults')

router
  .route('/')
  .get(
    advancedResults(Marque) ,
    getMarques,
  )
  .post(createMarque)

router
  .route('/:id')
  .get(getMarque)
  .put(updateMarque)
  .delete(deleteMarque)

router.route('/:id/photo').put(marquePhotoUpload)



module.exports = router
