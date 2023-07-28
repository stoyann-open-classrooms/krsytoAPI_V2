const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const ProductCategory = require('../models/ProductCategory')


//@description:     Get all  products
//@route:           GET /krysto/api/v2/products
//@access:          Public
exports.getProductCategories = asyncHandler(async (req, res, next) => {
  const productCategories = await ProductCategory.find()

  res.status(200).json({
    success: true,
    data: productCategories,
  })
})


//@description:     Get a single product category
//@route:           GET /krysto/api/v2/productCategories/:id
//@access:          Public
exports.getProductCategory = asyncHandler(async (req, res, next) => {
  const productCategory = await ProductCategory.findById(
    req.params.id,
  )

  if (!productCategory) {
    return next(
      new ErrorResponse(
        `product category not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({ success: true, data: productCategory })
})

//@description:     Create a new product category
//@route:           POST /krysto/api/v2/productCategories
//@access:          Private
exports.createProductCategory = asyncHandler(
  async (req, res, next) => {
    const productCategory = await ProductCategory.create(
      req.body,
    )
    res.status(201).json({ success: true, data: productCategory })
  },
)

//@description:     Update a  product category
//@route:           PUT /krysto/api/v2/productCategories/:id
//@access:          Private
exports.updateProductCategory = asyncHandler(
  async (req, res, next) => {
    const productCategory = await ProductCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )

    res.status(200).json({ success: true, data: productCategory })
  },
)

//@description:     Delete a  product category
//@route:           DELETE /krysto/api/v2/recyclableProductCategories/:id
//@access:          Private
exports.deleteProductCategory = asyncHandler(
  async (req, res, next) => {
    const productCategory = await productCategory.findById(
      req.params.id,
    )

    if (!productCategory) {
      return next(
        new ErrorResponse(
          `product category not found with ID of ${req.params.id}`,
          404,
        ),
      )
    }

    ProductCategory.remove()

    res.status(200).json({ success: true, data: {} })
  },
)
