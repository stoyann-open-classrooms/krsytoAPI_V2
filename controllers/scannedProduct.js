const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const ScannedProduct = require('../models/ScannedProduct');
const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Get all scanned products
// @route   GET /api/v1/scannedproducts
// @access  Private/User
exports.getScannedProducts = asyncHandler(async (req, res, next) => {
  const scannedProducts = await ScannedProduct.find();
  res.status(200).json({ success: true, data: scannedProducts });
});
// @desc    Get all scanned products for a specific user
// @route   GET /api/v1/users/:userId/scannedproducts
// @access  Private/User
exports.getUserScannedProducts = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(
        new ErrorResponse(`No user with the id of ${req.params.userId}`, 404)
      );
    }
  
    const scannedProducts = await ScannedProduct.find({ user: req.params.userId });
  
    res.status(200).json({ success: true, data: scannedProducts });
  });




  
  
// @desc    Get single scanned product
// @route   GET /api/v1/scannedproducts/:id
// @access  Private/User
exports.getScannedProduct = asyncHandler(async (req, res, next) => {
  const scannedProduct = await ScannedProduct.findById(req.params.id).populate('product');

  if (!scannedProduct) {
    return next(
      new ErrorResponse(`No scanned product with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: scannedProduct });
});

// @desc    Create new scanned product for a specific user
// @route   POST /api/v1/users/:userId/scannedproducts
// @access  Private/User
exports.createScannedProduct = asyncHandler(async (req, res, next) => {
    req.body.user = req.params.userId;
    
    // You might want to add validations to check if the user and the product exist
    
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(
        new ErrorResponse(`No user with the id of ${req.params.userId}`, 404)
      );
    }
  
    const product = await Product.findById(req.body.product);
    if (!product) {
      return next(
        new ErrorResponse(`No product with the id of ${req.body.productId}`, 404)
      );
    }
    
    const scannedProduct = await ScannedProduct.create(req.body);
    
    res.status(201).json({
      success: true,
      data: scannedProduct
    });
  });
  

// @desc    Update scanned product
// @route   PUT /api/v1/scannedproducts/:id
// @access  Private/User
exports.updateScannedProduct = asyncHandler(async (req, res, next) => {
  let scannedProduct = await ScannedProduct.findById(req.params.id);

  if (!scannedProduct) {
    return next(
      new ErrorResponse(`No scanned product with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is product owner
  if (scannedProduct.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this scanned product`,
        401
      )
    );
  }

  scannedProduct = await ScannedProduct.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: scannedProduct });
});

// @desc    Delete scanned product
// @route   DELETE /api/v1/scannedproducts/:id
// @access  Private/User
exports.deleteScannedProduct = asyncHandler(async (req, res, next) => {
  const scannedProduct = await ScannedProduct.findById(req.params.id);

  if (!scannedProduct) {
    return next(
      new ErrorResponse(`No scanned product with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is product owner
  if (scannedProduct.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this scanned product`,
        401
      )
    );
  }

  scannedProduct.remove();

  res.status(200).json({ success: true, data: {} });
});
