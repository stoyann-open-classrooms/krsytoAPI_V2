const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')


const VoluntaryDropPointSchema = new mongoose.Schema(
  {
    organisme: {
      type: String,
      required: true,
    },
    adresse: {
      type: String,
      required: true,
    },

    garbageTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GarbageType',
      },
    ],
    email: {
      type: String,
    },
    telephone: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      zipcode: String,
      country: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Geocode & create location field
VoluntaryDropPointSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.adresse)
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  }
  next()
})

module.exports = mongoose.model('VoluntaryDropPoint', VoluntaryDropPointSchema)
