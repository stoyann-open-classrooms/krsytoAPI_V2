const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')

const GarbageType = require('../models/GarbageType')

//@description:     Get all garbage types
//@ route:          GET /krysto/api/v1/garbage-types
//@access:          Public
exports.getGarbageTypes = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description:     Get a single garbage type
//@ route:          GET /krysto/api/v1/garbage-types/:id
//@access:          Public
exports.getGarbageType = asyncHandler(async (req, res, next) => {
  const garbageType = await GarbageType.findById(req.params.id).populate(
    'voluntaryDropPoints',
  )
  if (!garbageType) {
    return next(
      new ErrorResponse(
        `Garbage type not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }
  res.status(200).json({ success: true, data: garbageType })
})

//@description:     Create a garbage type
//@ route:          POST /krysto/api/v1/garbage-types
//@access:          Private
exports.createGarbageType = asyncHandler(async (req, res, next) => {
  const garbageType = await GarbageType.create(req.body)

  res.status(201).json({
    success: true,
    data: garbageType,
  })
})

//@description:     Update a garbage type
//@ route:          PUT /krysto/api/v1/garbage-types/:id
//@access:          Private
exports.updateGarbageType = asyncHandler(async (req, res, next) => {
  const garbageType = await GarbageType.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  res.status(200).json({
    success: true,
    data: garbageType,
  })
})

//@description:     Delete a garbage type
//@ route:          DELETE /krysto/api/v1/garbage-types/:id
//@access:          Private/Admin
exports.deleteGarbageType = asyncHandler(async (req, res, next) => {
  await GarbageType.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})
