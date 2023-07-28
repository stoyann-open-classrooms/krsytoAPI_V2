const express = require("express");
const {
  getScannedProducts,
  getScannedProduct,
  createScannedProduct,
  updateScannedProduct,
  deleteScannedProduct,
  getUserScannedProducts,
} = require("../controllers/scannedProduct");

const ScannedProduct = require("../models/ScannedProduct");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");
const User = require("../models/User");

router
  .route("/")
  .get(advancedResults(ScannedProduct), getScannedProducts)
  .post(createScannedProduct);
router.get(
  advancedResults(ScannedProduct),
  getUserScannedProducts
);

router
  .route("/:id")
  .get(getScannedProduct)
  .put(updateScannedProduct)
  .delete(deleteScannedProduct);

module.exports = router;
