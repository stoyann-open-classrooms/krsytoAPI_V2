const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const geocoder = require('../utils/geocoder')

const VoluntaryDropPoint = require('../models/VoluntaryDropPoint')

//@description:     Get all voluntary drop points
//@route:           GET /krysto/api/v2/voluntaryDropPoints
//@access:          Public
exports.getVoluntaryDropPoints = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description:     Get a single voluntary drop point
//@route:           GET /krysto/api/v2/voluntaryDropPoints/:id
//@access:          Public
exports.getVoluntaryDropPoint = asyncHandler(async (req, res, next) => {
  const voluntaryDropPoint = await VoluntaryDropPoint.findById(
    req.params.id,
  ).populate('garbageTypes')
  if (!voluntaryDropPoint) {
    return next(
      new ErrorResponse(
        `Voluntary drop point not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }
  res.status(200).json({ success: true, data: voluntaryDropPoint })
})

//@description:     Create a voluntary drop point
//@route:           POST /krysto/api/v2/voluntaryDropPoints
//@access:          Private
exports.createVoluntaryDropPoint = asyncHandler(async (req, res, next) => {
  const voluntaryDropPoint = await VoluntaryDropPoint.create(req.body)
  res.status(201).json({
    success: true,
    data: voluntaryDropPoint,
  })
})

//@description:     Update a voluntary drop point
//@route:           PUT /krysto/api/v2/voluntaryDropPoints/:id
//@access:          Private
exports.updateVoluntaryDropPoint = asyncHandler(async (req, res, next) => {
  const voluntaryDropPoint = await VoluntaryDropPoint.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  res.status(200).json({
    success: true,
    data: voluntaryDropPoint,
  })
})

//@description:     Delete a voluntary drop point
//@route:           DELETE /krysto/api/v2/voluntaryDropPoints/:id
//@access:          Private
exports.deleteVoluntaryDropPoint = asyncHandler(async (req, res, next) => {
  const voluntaryDropPoint = await VoluntaryDropPoint.findByIdAndDelete(
    req.params.id,
  )

  if (!voluntaryDropPoint) {
    return next(
      new ErrorResponse(
        `Voluntary drop point not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: {},
  })
})

//@description:     Get voluntary drop points within a radius
//@route:           GET /krysto/api/v2/voluntaryDropPoints/radius/:zipcode/:distance
//@access:          Private

exports.getVoluntaryDropPointsInRadius = asyncHandler(
  async (req, res, next) => {
    const { zipcode, distance } = req.params

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode)
    const lat = loc[0].latitude
    const lng = loc[0].longitude

    const radius = distance / 6378

    const voluntaryDropPoints = await VoluntaryDropPoint.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    })

    res.status(200).json({
      success: true,
      count: voluntaryDropPoints.length,
      data: voluntaryDropPoints,
    })
  },
)
