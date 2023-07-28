const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Message = require('../models/Message')

//@description:     Get all messages
//@ route:          GET /krysto/api/v1/messages
//@access:          Private
exports.getMessages = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description:     Get a single message
//@ route:          GET /krysto/api/v1/messages/:id
//@access:          Private
exports.getMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id)
  if (!message) {
    return next(
      new ErrorResponse(`Message not found with ID of ${req.params.id}`, 404),
    )
  }
  res.status(200).json({ success: true, data: message })
})

//@description:     Create new message
//@ route:          POST /krysto/api/v1/messages
//@access:          Public
exports.createMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.create(req.body)
  res.status(201).json({
    success: true,
    data: message,
  })
})

exports.updateMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: message,
  })
})

//@description:     Delete a message
//@ route:          DELETE /krysto/api/v1/messages/:id
//@access:          Private
exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id)

  if (!message) {
    return next(
      new ErrorResponse(`Message not found with ID of ${req.params.id}`, 404),
    )
  }

  message.remove()

  res.status(200).json({ success: true, data: {} })
})
