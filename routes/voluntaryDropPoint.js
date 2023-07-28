const express = require("express");
const {
  getVoluntaryDropPoints,
  getVoluntaryDropPoint,
  createVoluntaryDropPoint,
  updateVoluntaryDropPoint,
  deleteVoluntaryDropPoint,
  getVoluntaryDropPointsInRadius,
} = require("../controllers/voluntaryDropPoint");
const advancedResults = require("../middlewares/advancedResults");
const VoluntaryDropPoint = require("../models/VoluntaryDropPoint");
const garbageTypeRouter = require("./garbageType");
const router = express.Router();
router.use("/:garbageTypeId/collects", garbageTypeRouter);
router
  .route("/")
  .get(
    advancedResults(VoluntaryDropPoint, "garbageTypes"),
    getVoluntaryDropPoints
  )
  .post(createVoluntaryDropPoint);

router
  .route("/:id")
  .get(getVoluntaryDropPoint)
  .put(updateVoluntaryDropPoint)
  .delete(deleteVoluntaryDropPoint);

router.route("/radius/:zipcode/:distance").get(getVoluntaryDropPointsInRadius);

module.exports = router;
