const mongoose = require('mongoose')

// Définition du schéma pour les articles
const ProductSchema = new mongoose.Schema(
  {
    // General product information

    productFamilly: {
      type: String,
      enum: ['Alimentaires', 'Cosmétiques', 'Animaux'],
      default: 'Alimentaires'
    },

    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
    },

    codeBarre: { type: String, unique: true, required: true },
    marque: { type: String, required: true },
    designation: { type: String, required: true },
    genericName: { type: String },
    quantity: { type: String },
    photo: { type: String, default: 'no-photo.png' },

    // Product composition
    ingredients: [{ type: String }],
    allergens: [{ type: String }],
    additives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Additive' }],
    containsPalmOil: { type: Boolean, default: false },

// Nutrition facts
nutritionFacts: {
  energy: { per100g: Number, perPortion: Number },
  fats: { per100g: Number, perPortion: Number },
  monoUnsaturatedFats: { per100g: Number, perPortion: Number },
  polyUnsaturatedFats: { per100g: Number, perPortion: Number },
  transFats: { per100g: Number, perPortion: Number },
  cholesterol: { per100g: Number, perPortion: Number },
  sodium: { per100g: Number, perPortion: Number },
  potassium: { per100g: Number, perPortion: Number },
  calcium: { per100g: Number, perPortion: Number },
  iron: { per100g: Number, perPortion: Number },
  vitaminA: { per100g: Number, perPortion: Number },
  vitaminC: { per100g: Number, perPortion: Number },
  saturatedFats: { per100g: Number, perPortion: Number },
  carbohydrates: { per100g: Number, perPortion: Number },
  sugars: { per100g: Number, perPortion: Number },
  dietaryFibers: { per100g: Number, perPortion: Number },
  proteins: { per100g: Number, perPortion: Number },
  salt: { per100g: Number, perPortion: Number },
  alcohol: { per100g: Number, perPortion: Number },
  fruitsVegetablesNutsAndRapeseedWalnutAndOliveOils: {
    per100g: Number,
    perPortion: Number,
  },
  portionSize: String,
},


    // Product scores
    ecoScore: { type: mongoose.Schema.Types.ObjectId, ref: 'EcoScore' },
    nutriScore: { type: mongoose.Schema.Types.ObjectId, ref: 'NutriScore' },
    novaScore: { type: mongoose.Schema.Types.ObjectId, ref: 'NovaScore' },

    // Product handling and disposal
    recyclableByKrysto: { type: Boolean },
    plasticTypes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'PlasticType' },
    ],
    garbageTypes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'GarbageType' },
    ],

    // Regulations
    environementReglementation: { type: String },

    // Transportation and origin
    provenanceCountry: { type: String },
    transportation: {
      type: String,
      enum: [
        'Fabriquée en Nouvelle-Calédonie',
        'Transformée en Nouvelle-Calédonie',
        'Inconnu',
        'Importée',
      ],
      default: 'Importée',
      required: true,
    },

    // Other
    remarque: { type: String },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// reverse populate with virtuals

ProductSchema.virtual('priceReccords', {
  ref: 'PriceReccord',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
})



// Création du modèle d'articles basé sur le schéma
const Product = mongoose.model(
  'Product',
  ProductSchema,
)

module.exports = Product
