const mongoose = require('mongoose')

const NovaScoreSchema = new mongoose.Schema(
  {
    score: {
      type: String,
      enum: ['1', '2', '3', '4', 'Non defini'],
  
    },
    detail: {
      type: String,
    },

    photos: {
      type: String,
      default: 'no-photo.png',
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('NovaScore', NovaScoreSchema)
