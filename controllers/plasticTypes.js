const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const PlasticType = require('../models/PlasticType')

//@description:     Get all plastic types
//@route:            GET /krysto/api/v1/plastic-types
//@access:           Public
exports.getPlasticTypes = asyncHandler(async (req, res, next) => {
  const plasticTypes = await PlasticType.find()

  res.status(200).json({
    success: true,
    data: plasticTypes,
  })
})

//@description:     Get a single plastic type
//@route:            GET /krysto/api/v1/plastic-types/:id
//@access:           Public
exports.getPlasticType = asyncHandler(async (req, res, next) => {
  const plasticType = await PlasticType.findById(req.params.id)

  if (!plasticType) {
    return next(
      new ErrorResponse(
        `Plastic type not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: plasticType,
  })
})

//@description:     Create a plastic type
//@route:            POST /krysto/api/v1/plastic-types
//@access:           Private
exports.createPlasticType = asyncHandler(async (req, res, next) => {
  const plasticType = await PlasticType.create(req.body)

  res.status(201).json({
    success: true,
    data: plasticType,
  })
})

//@description:     Update a plastic type
//@route:            PUT /krysto/api/v1/plastic-types/:id
//@access:           Private
exports.updatePlasticType = asyncHandler(async (req, res, next) => {
  const plasticType = await PlasticType.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!plasticType) {
    return next(
      new ErrorResponse(
        `Plastic type not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: plasticType,
  })
})

//@description:     Delete a plastic type
//@route:            DELETE /krysto/api/v1/plastic-types/:id
//@access:           Private
exports.deletePlasticType = asyncHandler(async (req, res, next) => {
  const plasticType = await PlasticType.findByIdAndDelete(req.params.id)

  if (!plasticType) {
    return next(
      new ErrorResponse(
        `Plastic type not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: {},
  })
})

//@description:     Upload photo for plastic type
//@route:            PUT /krysto/api/v1/plastic-types/:id/photo
//@access:           Private
exports.uploadPlasticTypePhoto = asyncHandler(async (req, res, next) => {
  const plasticType = await PlasticType.findById(req.params.id)

  if (!plasticType) {
    return next(
      new ErrorResponse(
        `Plastic type not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }

  const file = req.files.icone

  // Check if the uploaded file is an image
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400))
  }

  // Check the file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD} bytes`,
        400,
      ),
    )
  }

  // Create custom filename
  file.name = `icone_${plasticType._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    // Update the plastic type with the photo filename
    await PlasticType.findByIdAndUpdate(req.params.id, { icone: file.name })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})
