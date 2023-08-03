const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const ProductFamilly = require('../models/ProductFamilly')

//@description:     Get all  product families
//@route:           GET /krysto/api/v2/productFamilies
//@access:          Public
exports.getProductFamilies = asyncHandler(async (req, res, next) => {
  const productFamilies = await ProductFamilly.find()

  res.status(200).json({
    success: true,
    data: productFamilies,
  })
})

//@description:     Get a single product family
//@route:           GET /krysto/api/v2/productFamilies/:id
//@access:          Public
exports.getProductFamilly = asyncHandler(async (req, res, next) => {
  const productFamilly = await ProductFamilly.findById(req.params.id)

  if (!productFamilly) {
    return next(
      new ErrorResponse(
        `Product family not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({ success: true, data: productFamilly })
})

//@description:     Create a new product family
//@route:           POST /krysto/api/v2/productFamilies
//@access:          Private
exports.createProductFamilly = asyncHandler(async (req, res, next) => {
  const productFamilly = await ProductFamilly.create(req.body)

  res.status(201).json({
    success: true,
    data: productFamilly,
  })
})

//@description:     Update a product family
//@route:           PUT /krysto/api/v2/productFamilies/:id
//@access:          Private
exports.updateProductFamilly = asyncHandler(async (req, res, next) => {
  const productFamilly = await ProductFamilly.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!productFamilly) {
    return next(
      new ErrorResponse(
        `Product family not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: productFamilly,
  })
})

//@description:     Delete a product family
//@route:           DELETE /krysto/api/v2/productFamilies/:id
//@access:          Private
exports.deleteProductFamilly = asyncHandler(async (req, res, next) => {
  const productFamilly = await ProductFamilly.findById(req.params.id)

  if (!productFamilly) {
    return next(
      new ErrorResponse(
        `Product family not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  productFamilly.remove()

  res.status(200).json({ success: true, data: {} })
})
