const express = require('express')
// get controller function
const {
  getNutriScores,
  createNutriScore,
  getNutriScore,
  deleteNutriScore,
  updateNutriScore,
} = require('../controllers/nutriScore')

const NutriScore = require('../models/NutriScore')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')

router
  .route('/')
  .get(advancedResults(NutriScore), getNutriScores)
  .post(createNutriScore)
router
  .route('/:id')
  .get(getNutriScore)
  .delete(deleteNutriScore)
  .put(updateNutriScore)

module.exports = router
