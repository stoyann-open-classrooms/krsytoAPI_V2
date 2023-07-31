const express = require('express');
const {
  getPriceRecords,
  createPriceRecord,
  getPriceRecord,
  updatePriceRecord,
  deletePriceRecord,
} = require('../controllers/priceReccord');

const PriceRecord = require('../models/PriceReccord');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(advancedResults(PriceRecord, 'product enseigne'), getPriceRecords)
  .post(createPriceRecord);

router
  .route('/:id')
  .get(getPriceRecord)
  .put( updatePriceRecord)
  .delete( deletePriceRecord);

module.exports = router;
