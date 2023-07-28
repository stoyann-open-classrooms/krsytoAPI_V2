const mongoose = require('mongoose')

const PlasticTypeSchema = new mongoose.Schema({
  sigleFr: {
    type: String,
    unique: true,
    required: true,
  },
  sigleEn: {
    type: String,
    unique: true,
    required: true,
  },
  scientificNameFr: {
    type: String,
    required: true,
  },
  scientificNameEn: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icone: {
    type: String,
    default: 'no-photo.png',
  },
  flotability: {
    alcohol: {
      type: Boolean,
      default: false,
    },
    vegetableOil: {
      type: Boolean,
      default: false,
    },
    water: {
      type: Boolean,
      default: false,
    },
    glycerine: {
      type: Boolean,
      default: false,
    },
  },
  injectionTemperature: {
    type: String,
    required: true,
  },
  density: {
    type: Number,
    required: true,
  },
  meltingPoint: {
    type: Number,
    required: true,
  },
  heatResistance: {
    type: String,
    required: true,
  },
  chemicalResistance: {
    type: String,
    required: true,
  },
  rigidity: {
    type: String,
    required: true,
  },
  toxicity: {
    type: String,
    required: true,
  },
  environmentalImpact: {
    type: String,
    required: true,
  },
})

const PlasticType = mongoose.model('PlasticType', PlasticTypeSchema)

module.exports = PlasticType
