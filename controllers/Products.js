const path = require('path')
const mongoose = require('mongoose');  // Add this line
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Product = require('../models/Product')
const PriceReccord = require('../models/PriceReccord');
const Enseigne = require('../models/Enseigne');

//@description:     Get all  products
//@route:           GET /krysto/api/v2/products
//@access:          Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find()

  res.status(200).json({
    success: true,
    data: products,
  })
})

//@description:     Get a single product
//@route:           GET /krysto/api/v2/products/:id
//@access:          Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(
    req.params.id,
  ).populate(
    'plasticTypes productCategory garbageTypes nutriScore ecoScore additives novaScore priceReccords',
  )

  if (!product) {
    return next(
      new ErrorResponse(
        `product not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: product,
  })
})

//@description:     Find a product by code barre
//@route:           GET /krysto/api/v2/products/codeBarre/:codeBarre
//@access:          Public
exports.findProductByCodeBarre = asyncHandler(
  async (req, res, next) => {
    const { codeBarre } = req.params

    const product = await Product.findOne({
      codeBarre,
    }).populate(
      'plasticTypes productCategory garbageTypes nutriScore ecoScore additives novaScore priceReccords',
    )

    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product with code barre ${codeBarre} not found.`,
      })
    }

    res.status(200).json({
      success: true,
      data: product,
    })
  },
)





//@description:     Create product
//@route:           POST /krysto/api/v2/products
//@access:          Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    data: product,
  })
})

//@description:     Update a  product
//@route:           PUT /krysto/api/v2/products/:id
//@access:          Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!product) {
    return next(
      new ErrorResponse(
        `product not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: product,
  })
})

//@description:     Delete  product
//@route:           DELETE /krysto/api/v2/products/:id
//@access:          Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(
    req.params.id,
  )

  if (!product) {
    return next(
      new ErrorResponse(
        ` Product not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc      Upload photo for product 
// @route     PUT /api/v1/products/:id/photo
// @access    Private
exports.productPhotoUpload = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(
      new ErrorResponse(
        `product  not found with id of ${req.params.id}`,
        404,
      ),
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }

  const file = req.files.photo

  //   console.log(file)

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400))
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400,
      ),
    )
  }

  // Create custom filename
  file.name = `product_photo_${product._id}${
    path.parse(file.name).ext
  }`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await Product.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})




//@description:     Get all  products
//@route:           GET /krysto/api/v2/products
//@access:          Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find()

  res.status(200).json({
    success: true,
    data: products,
  })
})

//@description:     Get a single product
//@route:           GET /krysto/api/v2/products/:id
//@access:          Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(
    req.params.id,
  ).populate(
    'plasticTypes productCategory garbageTypes nutriScore ecoScore additives novaScore priceReccords',
  )

  if (!product) {
    return next(
      new ErrorResponse(
        `product not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: product,
  })
})

//@description:     Find a product by code barre
//@route:           GET /krysto/api/v2/products/codeBarre/:codeBarre
//@access:          Public
exports.findProductByCodeBarre = asyncHandler(
  async (req, res, next) => {
    const { codeBarre } = req.params

    const product = await Product.findOne({
      codeBarre,
    }).populate(
      'plasticTypes productCategory garbageTypes nutriScore ecoScore additives novaScore priceReccords',
    )

    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product with code barre ${codeBarre} not found.`,
      })
    }

    res.status(200).json({
      success: true,
      data: product,
    })
  },
)

//@description:     Create product
//@route:           POST /krysto/api/v2/products
//@access:          Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    data: product,
  })
})

//@description:     Update a  product
//@route:           PUT /krysto/api/v2/products/:id
//@access:          Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!product) {
    return next(
      new ErrorResponse(
        `product not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: product,
  })
})

//@description:     Delete  product
//@route:           DELETE /krysto/api/v2/products/:id
//@access:          Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(
    req.params.id,
  )

  if (!product) {
    return next(
      new ErrorResponse(
        ` Product not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc      Upload photo for product 
// @route     PUT /api/v1/products/:id/photo
// @access    Private
exports.productPhotoUpload = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(
      new ErrorResponse(
        `product  not found with id of ${req.params.id}`,
        404,
      ),
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }

  const file = req.files.photo

  //   console.log(file)

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400))
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400,
      ),
    )
  }

  // Create custom filename
  file.name = `product_photo_${product._id}${
    path.parse(file.name).ext
  }`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await Product.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})



//@description:     Get average price of a product
//@route:           GET /krysto/api/v2/products/:id/average-price
//@access:          Public
exports.getAveragePrice = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { year, month } = req.query;

  let match = {
    product: mongoose.Types.ObjectId(id)
  };

  // If year is specified, match the year
  if (year) {
    match.year = parseInt(year, 10);
  }

  // If month is specified, match the month
  if (month) {
    match.month = parseInt(month, 10);
  }

  const aggResults = await PriceReccord.aggregate([
    {
      $addFields: {
        month: { $month: "$dateRecorded" },
        year: { $year: "$dateRecorded" }
      }
    },
    { $match: match },
    { $sort: { price: 1 } },
    {
      $group: {
        _id: '$product',
        avgPrice: { $avg: '$price' },
        maxPrice: { $max: '$price' },
        minPrice: { $min: '$price' },
        minPriceEnseigneId: { $first: '$enseigne' },
        maxPriceEnseigneId: { $last: '$enseigne' },
      },
    },
  ]);

  let result = aggResults.length > 0 ? aggResults[0] : null;

  if (result) {
    result.avgPrice = Math.round(result.avgPrice);

    // populate the enseigne details
    if (result.minPriceEnseigneId) {
      result.minPriceEnseigne = await Enseigne.findById(result.minPriceEnseigneId);
    }
    if (result.maxPriceEnseigneId) {
      result.maxPriceEnseigne = await Enseigne.findById(result.maxPriceEnseigneId);
    }
  }

  res.status(200).json({
    success: true,
    data: result
  });
});
