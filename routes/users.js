const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  userLogoUpload,
} = require("../controllers/users");

const router = express.Router({ mergeParams: true });

const scannedProductRouter = require("./scannedProduct");
const { protect, authorize } = require("../middlewares/auth");
const User = require("../models/User");
router.use("/:userId/scannedProducts", scannedProductRouter);
const advancedResults = require("../middlewares/advancedResults");

router.route("/:id/logo").put(userLogoUpload);

// router.use(protect)
// router.use(authorize('admin', 'staff'))

router
  .route("/")
  .get(advancedResults(User), getUsers)

  .post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
