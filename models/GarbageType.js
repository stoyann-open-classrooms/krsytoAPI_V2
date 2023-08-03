const mongoose = require('mongoose')

const GarbageTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'no-photo.png',
    },

    containerColor: {
      type: String,
    },

    details: {
      type: String,
      maxlength: [300, 'Une remarque ne peut pas faire plus de 300 caractères'],
      default: 'Aucun détail pour ce déchet',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// // reverse populate with virtuals

GarbageTypeSchema.virtual('voluntaryDropPoints', {
  ref: 'VoluntaryDropPoint',
  localField: '_id',
  foreignField: 'garbageTypes',
  justOne: false,
})

module.exports = mongoose.model('GarbageType', GarbageTypeSchema)
