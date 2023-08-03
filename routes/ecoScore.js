const express = require('express')
// get controller function
const {
  getEcoScores,
  createEcoScore,
  getEcoScore,
  deleteEcoScore,
  updateEcoScore,
  ecoScorePhotoUpload,
} = require('../controllers/ecoScore')

const NutriScore = require('../models/EcoScore')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')

router
  .route('/')
  .get(advancedResults(NutriScore), getEcoScores)
  .post(createEcoScore)
router.route('/:id').get(getEcoScore).delete(deleteEcoScore).put(updateEcoScore)
router.route('/:id/photo').put(ecoScorePhotoUpload)
module.exports = router
