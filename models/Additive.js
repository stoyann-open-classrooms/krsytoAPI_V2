const mongoose = require('mongoose')

const AdditiveSchema = new mongoose.Schema(
  {

    code: {
      type: String
    },

    name: {
      type: String,
      required: true,
    },

    bioAuthorization: {
      type: Boolean,
      
    },

    function: {
      type: String,
      enum: ['Colorant', "Support",'Conservateur', 'Conservateur, agent de blanchiment (freine le brunissement)', 'Antioxydant', 'Antioxydant, agent de texture', "Régulateur d'acidité","Édulcorant", "Agent d'enrobage", "Exhausteur de goût", "Agent de traitement des farines", "Antiagglomérant", "Séquestrant", "Agent de rétention de la couleur", "Gaz de conditionnement", "Humectant", "Gaz de conditionnement",        ],
    },
    danger: {
      type: String,
      enum: ["1-Acceptable", "2-Tolérable","3 - Peu recommandable","4-À éviter"]
    },

    description: {
      type: String,
      required: true,
    },



    source: {
      type: String,
      default: 'https://www.quechoisir.org/comparatif-additifs-alimentaires-n56877/',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

const Additive = mongoose.model('Additive', AdditiveSchema)

module.exports = Additive
