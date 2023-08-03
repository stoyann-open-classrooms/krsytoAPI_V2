const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const EnseigneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `Merci d'ajouter un nom pour l'enseigne`],
      unique: true,
      trim: true,
      maxlength: [50, 'Le nom de ne pas conternir plus de 50 caractéres']
    },

    type: {
      type: String,
      enum: ['Petite surface', 'Grande surface', 'Station', 'Autres'],
  
    },

    photo: { type: String, default: 'no-photo.png' },
    
    web: { type: String },
 
 
    address: {
      type: String,
      required: true,
    },

    
    groupe: {
        type: String
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
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Geocode & create location
EnseigneSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };

  // Do not save address
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Enseigne', EnseigneSchema);
