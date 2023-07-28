const mongoose = require('mongoose');

const ScannedProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  scannedAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('ScannedProduct', ScannedProductSchema);
