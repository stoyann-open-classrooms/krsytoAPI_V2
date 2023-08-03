// dependency
const path = require('path')
const express = require('express')
const ejs = require('ejs')

const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const fileupload = require('express-fileupload')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

//import middlewares
const errorHandler = require('./middlewares/error.js')

// load config DB
const connectDB = require('./config/db')

//load environement variables
dotenv.config({ path: './config/config.env' })

//Connect to database
connectDB()

// Route files
const auth = require('./routes/auth')
const users = require('./routes/users')
const messages = require('./routes/message')
const plasticTypes = require('./routes/plasticTypes')
const productCategories = require('./routes/productCategories.js')
const productFamilies = require('./routes/productFamilly.js')
const products = require('./routes/products.js')
const voluntaryDropPoints = require('./routes/voluntaryDropPoint.js')
const garbageTypes = require('./routes/garbageType.js')
const nutriScores = require('./routes/nutriScore.js')
const novaScores = require('./routes/novaScore.js')
const ecoScores = require('./routes/ecoScore.js')
const additives = require('./routes/additive.js')
const enseignes = require('./routes/enseigne.js')
const priceReccords = require('./routes/priceReccord.js')
const scannedProducts = require('./routes/scannedProduct.js')
const marques = require('./routes/marques.js')

// initialize express  application
const app = express()
app.set('view engine', 'ejs')
// Body parser
app.use(express.json())

// Dev logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// File uploading
app.use(fileupload())

// // ======================= Security ====================
// // Sanitize data
 app.use(mongoSanitize())

// // Set security headers
 app.use(helmet())

// // Prevent XSS attacks
 app.use(xss())

// // Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 1000,
})
 app.use(limiter)

// // Prevent http param pollution
 app.use(hpp())

// Enable CORS
app.use(
  cors({
    origin: '*',
  }),
)
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

// =====================================================

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mount routers
app.use('/krysto_scan/api/v1/auth', auth)
app.use('/krysto_scan/api/v1/users', users)
app.use('/krysto_scan/api/v1/messages', messages)
app.use('/krysto_scan/api/v1/plasticTypes', plasticTypes)
app.use('/krysto_scan/api/v1/products', products)
app.use('/krysto_scan/api/v1/voluntaryDropPoints', voluntaryDropPoints)
app.use('/krysto_scan/api/v1/garbageTypes', garbageTypes)
app.use('/krysto_scan/api/v1/productCategories', productCategories)
app.use('/krysto_scan/api/v1/nutriScores', nutriScores)
app.use('/krysto_scan/api/v1/ecoScores', ecoScores)
app.use('/krysto_scan/api/v1/novaScores', novaScores)
app.use('/krysto_scan/api/v1/additives', additives)
app.use('/krysto_scan/api/v1/enseignes', enseignes)
app.use('/krysto_scan/api/v1/priceReccords', priceReccords)
app.use('/krysto_scan/api/v1/scannedProducts', scannedProducts)
app.use('/krysto_scan/api/v1/marques', marques)
app.use('/krysto_scan/api/v1/productFamilies', productFamilies)

app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.get('/', (req, res) => res.render('index'))

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} root URL : http://localhost:${PORT}/krysto_scan/api/v1 `
      .white.underline.bold.bgGreen,
  ),
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  // Close server and exit process
  server.close(() => process.exit(1))
})
