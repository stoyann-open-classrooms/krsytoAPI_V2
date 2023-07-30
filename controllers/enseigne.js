const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const geocoder = require('../utils/geocoder');

const Enseigne = require('../models/Enseigne');

// @desc Get all enseignes
// @route GET /api/v1/enseignes
// @access Public
exports.getEnseignes = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc Get single enseigne
// @route GET /api/v1/enseignes/:id
// @access Public
exports.getEnseigne = asyncHandler(async (req, res, next) => {
  const enseigne = await Enseigne.findById(req.params.id);

  if (!enseigne) {
    return next(
      new ErrorResponse(`Enseigne not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: enseigne });
});

// @desc Create new enseigne
// @route POST /api/v1/enseignes
// @access Private
exports.createEnseigne = asyncHandler(async (req, res, next) => {
  const enseigne = await Enseigne.create(req.body);
  res.status(201).json({ success: true, data: enseigne });
});

// @desc Update enseigne
// @route PUT /api/v1/enseignes/:id
// @access Private
exports.updateEnseigne = asyncHandler(async (req, res, next) => {
  const enseigne = await Enseigne.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!enseigne) {
    return next(
      new ErrorResponse(`Enseigne not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: enseigne });
});

// @desc Delete enseigne
// @route DELETE /api/v1/enseignes/:id
// @access Private
exports.deleteEnseigne = asyncHandler(async (req, res, next) => {
  const enseigne = await Enseigne.findByIdAndDelete(req.params.id);

  if (!enseigne) {
    return next(
      new ErrorResponse(`Enseigne not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});

// @desc Get enseignes within a radius
// @route GET /api/v1/enseignes/radius/:zipcode/:distance
// @access Private
exports.getEnseignesInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 6378;

  const enseignes = await Enseigne.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: enseignes.length,
    data: enseignes
  });
});

// @desc      Upload photo for enseigne 
// @route     PUT /api/v1/enseignes/:id/photo
// @access    Private
exports.enseignePhotoUpload = asyncHandler(async (req, res, next) => {
  const enseigne = await Enseigne.findById(req.params.id)

  if (!enseigne) {
    return next(
      new ErrorResponse(
        `product  not found with id of ${req.params.id}`,
        404,
      ),
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }

  const file = req.files.photo

  //   console.log(file)

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400))
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400,
      ),
    )
  }

  // Create custom filename
  file.name = `enseigne_photo_${enseigne._id}${
    path.parse(file.name).ext
  }`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await Enseigne.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})
