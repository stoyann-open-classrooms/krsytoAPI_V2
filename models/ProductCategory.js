const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')

const ProductCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// reverse populate with virtuals
ProductCategorySchema.virtual('product', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'productCategory',
  justOne: false,
})

// Création du modèle de catégorie de produits basé sur le schéma
const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema)

module.exports = ProductCategory
