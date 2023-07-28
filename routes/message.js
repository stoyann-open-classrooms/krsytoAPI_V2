const express = require('express')
// get controller function
const {
  getMessage,
  createMessage,
  deleteMessage,
  getMessages,
  updateMessage,
} = require('../controllers/message')

const Message = require('../models/Message')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')

router.route('/').get(advancedResults(Message), getMessages).post(createMessage)
router.route('/:id').get(getMessage).delete(deleteMessage).put(updateMessage)

module.exports = router
