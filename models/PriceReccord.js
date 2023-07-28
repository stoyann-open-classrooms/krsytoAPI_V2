const mongoose = require('mongoose');

const PriceReccordSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  enseigne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enseigne',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  promotion: {
    type: Boolean,
    default: false
  },

  dateRecorded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PriceReccord', PriceReccordSchema);
