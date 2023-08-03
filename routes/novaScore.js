const express = require('express')
// get controller function
const {
  getNovaScores,
  createNovaScore,
  getNovaScore,
  deleteNovaScore,
  updateNovaScore,
  novaScorePhotoUpload,
} = require('../controllers/novaScore')

const NovaScore = require('../models/NovaScore')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')

router
  .route('/')
  .get(advancedResults(NovaScore), getNovaScores)
  .post(createNovaScore)
router
  .route('/:id')
  .get(getNovaScore)
  .delete(deleteNovaScore)
  .put(updateNovaScore)
  router.route('/:id/photo').put(novaScorePhotoUpload)

module.exports = router
