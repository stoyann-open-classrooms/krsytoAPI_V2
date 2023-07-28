const express = require('express');
const {
  getEnseignes,
  getEnseigne,
  createEnseigne,
  updateEnseigne,
  deleteEnseigne,
  getEnseignesInRadius,
  enseignePhotoUpload
} = require('../controllers/enseigne');
const advancedResults = require('../middlewares/advancedResults');
const Enseigne = require('../models/Enseigne');

const router = express.Router();

router
  .route('/')
  .get(advancedResults(Enseigne), getEnseignes)
  .post(createEnseigne);

router
  .route('/:id')
  .get(getEnseigne)
  .put(updateEnseigne)
  .delete(deleteEnseigne);

router
  .route('/:id/photo')
  .put(enseignePhotoUpload);

router
  .route('/radius/:zipcode/:distance')
  .get(getEnseignesInRadius);

module.exports = router;
