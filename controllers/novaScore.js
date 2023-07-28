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

//@desc: Upload photos for nova score
//@route: PUT /krysto/api/v2/nutriScores/:id/photo
//@access: Private

exports.novaScorePhotoUpload = asyncHandler(async (req, res, next) => {
  const novaScore = await NovaScore.findById(req.params.id)

  if (!novaScore) {
    return next(
      new ErrorResponse(
        `Nova score not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  if (!req.file) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }

  const file = req.file

  // Check if the uploaded file is an image
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400))
  }

  // Check file size
  const maxSizeInBytes = process.env.MAX_FILE_UPLOAD
  if (file.size > maxSizeInBytes) {
    return next(
      new ErrorResponse(
        `The file exceeds the maximum upload size of ${maxSizeInBytes} bytes`,
        400,
      ),
    )
  }

  // Generate filename
  const uploadPath = process.env.FILE_UPLOAD_PATH
  const ext = path.parse(file.name).ext
  const filename = `photo__${uuidv4()}${ext}`

  // Move and update the database
  await file.mv(`${uploadPath}/${filename}`)
  await NovaScore.findByIdAndUpdate(req.params.id, { photo: filename })

  res.status(200).json({
    success: true,
    data: filename,
  })
})
