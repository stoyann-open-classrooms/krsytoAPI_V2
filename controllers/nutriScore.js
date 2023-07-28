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

//@desc: Upload photos for nutri score
//@route: PUT /krysto/api/v2/nutriScores/:id/photo
//@access: Private
//@desc: Upload photo for nutri score
//@route: PUT /krysto/api/v2/nutriScores/:id/photo
//@access: Private
exports.nutriScorePhotoUpload = asyncHandler(async (req, res, next) => {
  const nutriScore = await NutriScore.findById(req.params.id)

  if (!nutriScore) {
    return next(
      new ErrorResponse(
        `Nutri score not found with ID of ${req.params.id}`,
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
  await NutriScore.findByIdAndUpdate(req.params.id, { photo: filename })

  res.status(200).json({
    success: true,
    data: filename,
  })
})
