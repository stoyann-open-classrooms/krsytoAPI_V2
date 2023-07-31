const express = require('express')
const {
  getGarbageTypes,
  createGarbageType,
  getGarbageType,
  updateGarbageType,
  deleteGarbageType,
} = require('../controllers/garbageType')

const GarbageType = require('../models/GarbageType')

const router = express.Router({ mergeParams: true })

const advancedResults = require('../middlewares/advancedResults')
const { protect, authorize } = require('../middlewares/auth')
const VoluntaryDropPoint = require('../models/VoluntaryDropPoint')

router
  .route('/')
  .get(advancedResults(GarbageType, 'voluntaryDropPoints'), getGarbageTypes)
  .post( createGarbageType)

router
  .route('/:id')
  .get(getGarbageType)
  .put( updateGarbageType)
  .delete( deleteGarbageType)

module.exports = router
