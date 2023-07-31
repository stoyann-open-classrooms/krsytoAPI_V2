const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const PriceRecord = require('../models/PriceReccord');
const Product = require('../models/Product');
const Enseigne = require('../models/Enseigne');
const PriceReccord = require('../models/PriceReccord');

// @desc    Get all price records
// @route   GET /api/v1/pricerecords
// @access  Public
exports.getPriceRecords = asyncHandler(async (req, res, next) => {
  const priceRecords = await PriceRecord.find();
  res.status(200).json({ success: true, data: priceRecords });
});

// @desc    Get single price record
// @route   GET /api/v1/pricerecords/:id
// @access  Public
exports.getPriceRecord = asyncHandler(async (req, res, next) => {
  const priceRecord = await PriceRecord.findById(req.params.id);

  if (!priceRecord) {
    return next(
      new ErrorResponse(`No price record with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: priceRecord });
});



//@description:     Create price reccord for specific product
//@ route:          POST /krysto/api/v2/products/:productId/priceReccords
//@access:          Private
exports.createPriceRecord = asyncHandler(async (req, res, next) => {
    req.body.product = req.params.productId
  
    const product = await Product.findById(req.params.productId)
  
    if (!product) {
      return next(
        new ErrorResponse(
          `Aucun produit trouvée avec l'identifiant ${req.params.partnerId}`,
        ),
        404,
      )
    }
  
    const priceReccord = await PriceReccord.create(req.body)
  
    res.status(200).json({
      success: true,
      data: priceReccord,
    })
  })


  // @desc    Get all price records for a specific store
// @route   GET /api/v1/pricerecords/store/:storeId
// @access  Public
exports.getPriceRecordsByStore = asyncHandler(async (req, res, next) => {
  const priceRecords = await PriceRecord.find({ enseigne: req.params.enseigneId });

  if (!priceRecords || priceRecords.length === 0) {
    return next(
      new ErrorResponse(`No price records found for the store with id of ${req.params.enseigneId}`, 404)
    );
  }

  res.status(200).json({ success: true, data: priceRecords });
});






// @desc    Update price record
// @route   PUT /api/v1/pricerecords/:id
// @access  Private
exports.updatePriceRecord = asyncHandler(async (req, res, next) => {
  const priceRecord = await PriceRecord.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!priceRecord) {
    return next(
      new ErrorResponse(`No price record with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: priceRecord });
});

// @desc    Delete price record
// @route   DELETE /api/v1/pricerecords/:id
// @access  Private
exports.deletePriceRecord = asyncHandler(async (req, res, next) => {
  const priceRecord = await PriceRecord.findByIdAndDelete(req.params.id);

  if (!priceRecord) {
    return next(
      new ErrorResponse(`No price record with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
