const path = require('path')
const NovaScore = require('../models/NovaScore')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
//@description: Get all nova scores
//@route: GET /krysto/api/v2/novaScores
//@access: Public
exports.getNovaScores = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description: Get a single nova score
//@route: GET /krysto/api/v2/novaScores/:id
//@access: Public
exports.getNovaScore = asyncHandler(async (req, res, next) => {
  const novaScore = await NovaScore.findById(req.params.id)

  if (!novaScore) {
    return next(
      new ErrorResponse(
        `Nova score not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({ success: true, data: novaScore })
})

//@description: Create a new nova score
//@route: POST /krysto/api/v2/novaScores
//@access: Private
exports.createNovaScore = asyncHandler(async (req, res, next) => {
  const novaScore = await NovaScore.create(req.body)
  res.status(201).json({
    success: true,
    data: novaScore,
  })
})

//@description: Update a nova score
//@route: PUT /krysto/api/v2/novaScores/:id
//@access: Private
exports.updateNovaScore = asyncHandler(async (req, res, next) => {
  const novaScore = await NovaScore.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!novaScore) {
    return next(
      new ErrorResponse(
        `Nova score not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: novaScore,
  })
})

//@description: Delete a nova score
//@route: DELETE /krysto/api/v2/novaScores/:id
//@access: Private
exports.deleteNovaScore = asyncHandler(async (req, res, next) => {
  const novaScore = await NovaScore.findById(req.params.id)

  if (!novaScore) {
    return next(
      new ErrorResponse(
        `Nova score not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  novaScore.remove()

  res.status(200).json({ success: true, data: {} })
})

// @desc      Upload photo for product 
// @route     PUT /api/v1/products/:id/photo
// @access    Private
exports.novaScorePhotoUpload = asyncHandler(async (req, res, next) => {
  const novaScore = await NovaScore.findById(req.params.id)

  if (!novaScore) {
    return next(
      new ErrorResponse(
        `score nova  not found with id of ${req.params.id}`,
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
  file.name = `nova_photo_${novaScore._id}${
    path.parse(file.name).ext
  }`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await NovaScore.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})
