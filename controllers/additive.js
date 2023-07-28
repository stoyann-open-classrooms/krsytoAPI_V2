const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Additive = require('../models/Additive')

//@description:     Get all additives
//@route:           GET /krysto/api/v1/additives
//@access:          Private
exports.getAdditives = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description:     Get a single additive
//@route:           GET /krysto/api/v1/additives/:id
//@access:          Private
exports.getAdditive = asyncHandler(async (req, res, next) => {
  const additive = await Additive.findById(req.params.id)
  if (!additive) {
    return next(
      new ErrorResponse(`Additive not found with ID of ${req.params.id}`, 404),
    )
  }
  res.status(200).json({ success: true, data: additive })
})

//@description:     Create new additive
//@route:           POST /krysto/api/v1/additives
//@access:          Public
exports.createAdditive = asyncHandler(async (req, res, next) => {
  const additive = await Additive.create(req.body)
  res.status(201).json({
    success: true,
    data: additive,
  })
})

//@description:     Update an additive
//@route:           PUT /krysto/api/v1/additives/:id
//@access:          Private
exports.updateAdditive = asyncHandler(async (req, res, next) => {
  const additive = await Additive.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: additive,
  })
})

//@description:     Delete an additive
//@route:           DELETE /krysto/api/v1/additives/:id
//@access:          Private
exports.deleteAdditive = asyncHandler(async (req, res, next) => {
  const additive = await Additive.findById(req.params.id)

  if (!additive) {
    return next(
      new ErrorResponse(`Additive not found with ID of ${req.params.id}`, 404),
    )
  }

  await additive.remove()

  res.status(200).json({ success: true, data: {} })
})
