const path = require('path')
const NutriScore = require('../models/NutriScore')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')

//@description: Get all nutri scores
//@route: GET /krysto/api/v2/nutriScores
//@access: Public
exports.getNutriScores = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description: Get a single nutri score
//@route: GET /krysto/api/v2/nutriScores/:id
//@access: Public
exports.getNutriScore = asyncHandler(async (req, res, next) => {
  const nutriScore = await NutriScore.findById(req.params.id)

  if (!nutriScore) {
    return next(
      new ErrorResponse(
        `Nutri score not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({ success: true, data: nutriScore })
})

//@description: Create a new nutri score
//@route: POST /krysto/api/v2/nutriScores
//@access: Private
exports.createNutriScore = asyncHandler(async (req, res, next) => {
  const nutriScore = await NutriScore.create(req.body)
  res.status(201).json({
    success: true,
    data: nutriScore,
  })
})

//@description: Update a nutri score
//@route: PUT /krysto/api/v2/nutriScores/:id
//@access: Private
exports.updateNutriScore = asyncHandler(async (req, res, next) => {
  const nutriScore = await NutriScore.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!nutriScore) {
    return next(
      new ErrorResponse(
        `Nutri score not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: nutriScore,
  })
})

//@description: Delete a nutri score
//@route: DELETE /krysto/api/v2/nutriScores/:id
//@access: Private
exports.deleteNutriScore = asyncHandler(async (req, res, next) => {
  const nutriScore = await NutriScore.findById(req.params.id)

  if (!nutriScore) {
    return next(
      new ErrorResponse(
        `Nutri score not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  nutriScore.remove()

  res.status(200).json({ success: true, data: {} })
})

// @desc      Upload photo for product 
// @route     PUT /api/v1/products/:id/photo
// @access    Private
exports.nutriScorePhotoUpload = asyncHandler(async (req, res, next) => {
  const nutriScore = await NutriScore.findById(req.params.id)

  if (!nutriScore) {
    return next(
      new ErrorResponse(
        `score nutri  not found with id of ${req.params.id}`,
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
  file.name = `nutri_photo_${nutriScore._id}${
    path.parse(file.name).ext
  }`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await NutriScore.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})
