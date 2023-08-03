const Marque = require('../models/Marque')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const path = require('path')
const uuidv4 = require('uuid').v4

// @description: Get all marques
// @route: GET /api/v1/marques
// @access: Public
exports.getMarques = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @description: Get a single marque
// @route: GET /api/v1/marques/:id
// @access: Public
exports.getMarque = asyncHandler(async (req, res, next) => {
  const marque = await Marque.findById(req.params.id)

  if (!marque) {
    return next(
      new ErrorResponse(
        `Marque not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({ success: true, data: marque })
})

// @description: Create a new marque
// @route: POST /api/v1/marques
// @access: Private
exports.createMarque = asyncHandler(async (req, res, next) => {
  const marque = await Marque.create(req.body)
  res.status(201).json({
    success: true,
    data: marque,
  })
})

// @description: Update a marque
// @route: PUT /api/v1/marques/:id
// @access: Private
exports.updateMarque = asyncHandler(async (req, res, next) => {
  const marque = await Marque.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!marque) {
    return next(
      new ErrorResponse(
        `Marque not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: marque,
  })
})

// @description: Delete a marque
// @route: DELETE /api/v1/marques/:id
// @access: Private
exports.deleteMarque = asyncHandler(async (req, res, next) => {
  const marque = await Marque.findById(req.params.id)

  if (!marque) {
    return next(
      new ErrorResponse(
        `Marque not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  marque.remove()

  res.status(200).json({ success: true, data: {} })
})

// @desc      Upload photo for marque
// @route     PUT /api/v1/marques/:id/photo
// @access    Private
exports.marquePhotoUpload = asyncHandler(async (req, res, next) => {
    const marque = await Marque.findById(req.params.id)
  
    if (!marque) {
      return next(
        new ErrorResponse(
          `marque  not found with id of ${req.params.id}`,
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
    file.name = `marque_photo_${marque._id}${
      path.parse(file.name).ext
    }`
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.error(err)
        return next(new ErrorResponse(`Problem with file upload`, 500))
      }
  
      await Marque.findByIdAndUpdate(req.params.id, {
        photo: file.name,
      })
  
      res.status(200).json({
        success: true,
        data: file.name,
      })
    })
  })
  