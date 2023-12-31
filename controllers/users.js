const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const User = require('../models/User')
const sendEmail = require('../utils/sendEmail')
const path = require('path')

// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body)

  const message = `Votre compte KRYSTO vient d'être créé ! Vous pouvez désormais vous connecter à votre espace client sur le site www.krysto.nc 
  avec les identifiants suivants : email : ${req.body.email} password: ${req.body.password}. N'oubliez pas de changer votre mot de passe.`

  try {
    await sendEmail({
      email: user.email,
      subject: `Création de votre compte ${req.body.role} Krysto`,
      message,
    })
    res.status(201).json({ success: true, data: user })
  } catch (err) {
    console.log(err)
    return next(new ErrorResponse('Email could not be sent', 500))
  }
})

// @desc      Update user
// @route     PUT /api/v1/auth/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc      Delete user
// @route     DELETE /api/v1/auth/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc      Get current logged in user
// @route     POST /api/v2/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('collectPoints')

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc      Upload photo for product category
// @route     PUT /api/v1/productCategories/:id/photo
// @access    Private
exports.userLogoUpload = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorResponse(`User  not found with id of ${req.params.id}`, 404),
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }

  const file = req.files.logo

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
  file.name = `user_logo_${user._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await User.findByIdAndUpdate(req.params.id, { logo: file.name })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})
