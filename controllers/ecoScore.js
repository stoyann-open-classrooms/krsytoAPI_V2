const EcoScore = require('../models/EcoScore')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')

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

//@desc: Upload photo for eco score
//@route: PUT /krysto/api/v2/ecoScores/:id/photo
//@access: Private
exports.ecoScorePhotoUpload = asyncHandler(async (req, res, next) => {
  const ecoScore = await EcoScore.findById(req.params.id)

  if (!ecoScore) {
    return next(
      new ErrorResponse(`Eco score not found with ID of ${req.params.id}`, 404),
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
  await EcoScore.findByIdAndUpdate(req.params.id, { photo: filename })

  res.status(200).json({
    success: true,
    data: filename,
  })
})
