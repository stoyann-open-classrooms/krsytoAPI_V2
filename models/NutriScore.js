const mongoose = require('mongoose')

const NutriScoreSchema = new mongoose.Schema(
  {
    score: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'E', 'Non defini'],
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

module.exports = mongoose.model('NutriScore', NutriScoreSchema)
