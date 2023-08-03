const EcoScore = require('../models/EcoScore')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const path = require('path')
//@description: Get all eco scores
//@route: GET /krysto/api/v2/ecoScores
//@access: Public
exports.getEcoScores = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description: Get a single eco score
//@route: GET /krysto/api/v2/ecoScores/:id
//@access: Public
exports.getEcoScore = asyncHandler(async (req, res, next) => {
  const ecoScore = await EcoScore.findById(req.params.id)

  if (!ecoScore) {
    return next(
      new ErrorResponse(`Eco score not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({ success: true, data: ecoScore })
})

//@description: Create a new eco score
//@route: POST /krysto/api/v2/ecoScores
//@access: Private
exports.createEcoScore = asyncHandler(async (req, res, next) => {
  const ecoScore = await EcoScore.create(req.body)
  res.status(201).json({
    success: true,
    data: ecoScore,
  })
})

//@description: Update an eco score
//@route: PUT /krysto/api/v2/ecoScores/:id
//@access: Private
exports.updateEcoScore = asyncHandler(async (req, res, next) => {
  const ecoScore = await EcoScore.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!ecoScore) {
    return next(
      new ErrorResponse(`Eco score not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: ecoScore,
  })
})

//@description: Delete an eco score
//@route: DELETE /krysto/api/v2/ecoScores/:id
//@access: Private
exports.deleteEcoScore = asyncHandler(async (req, res, next) => {
  const ecoScore = await EcoScore.findById(req.params.id)

  if (!ecoScore) {
    return next(
      new ErrorResponse(`Eco score not found with ID of ${req.params.id}`, 404),
    )
  }

  ecoScore.remove()

  res.status(200).json({ success: true, data: {} })
})

// @desc      Upload photo for product 
// @route     PUT /api/v1/products/:id/photo
// @access    Private
exports.ecoScorePhotoUpload = asyncHandler(async (req, res, next) => {
  const ecoScore = await EcoScore.findById(req.params.id)

  if (!ecoScore) {
    return next(
      new ErrorResponse(
        `score eco  not found with id of ${req.params.id}`,
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
  file.name = `nutri_photo_${ecoScore._id}${
    path.parse(file.name).ext
  }`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await EcoScore.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})
