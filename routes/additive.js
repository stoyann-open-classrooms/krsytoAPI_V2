const express = require('express')
// get controller function
const {
  getAdditives,
  createAdditive,
  getAdditive,
  deleteAdditive,
  updateAdditive,
} = require('../controllers/additive')

const Additive = require('../models/Additive')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')

router
  .route('/')
  .get(advancedResults(Additive), getAdditives)
  .post(createAdditive)
router.route('/:id').get(getAdditive).delete(deleteAdditive).put(updateAdditive)

module.exports = router
