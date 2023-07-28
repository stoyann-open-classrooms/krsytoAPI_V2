const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Load models

const User = require('./models/User')
const Message = require('./models/Message')
const ProductCategory = require('./models/ProductCategory')
const PlasticType = require('./models/PlasticType')
const Product = require('./models/Product')
const VoluntaryDropPoint = require('./models/VoluntaryDropPoint')
const GarbageType = require('./models/GarbageType')
const NutriScore = require('./models/NutriScore')
const EcoScore = require('./models/EcoScore')
const Additive = require('./models/Additive')
const NovaScore = require('./models/NovaScore')
const Enseigne = require('./models/Enseigne')
const PriceReccord = require('./models/PriceReccord')

// Connect to DB
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})

// Read JSON files

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'),
)



const messages = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/messages.json`, 'utf-8'),
)


const productCategories = JSON.parse(
  fs.readFileSync(
    `${__dirname}/_data/productCategories.json`,
    'utf-8',
  ),
)


const plasticTypes = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/plasticTypes.json`, 'utf-8'),
)
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8'),
)
const voluntaryDropPoints = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/voluntaryDropPoints.json`, 'utf-8'),
)
const garbageTypes = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/garbageType.json`, 'utf-8'),
)
const nutriScores = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/nutriScore.json`, 'utf-8'),
)
const ecoScores = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/ecoScore.json`, 'utf-8'),
)

const additives = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/additive.json`, 'utf-8'),
)
const novaScores = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/novaScore.json`, 'utf-8'),
)
const enseignes = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/enseigne.json`, 'utf-8'),
)
const priceReccords = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/priceReccord.json`, 'utf-8'),
)

// Import into DB
const importData = async () => {
  try {
    await User.create(users)
   
    await Message.create(messages)
 
 
    await ProductCategory.create(productCategories)


    await PlasticType.create(plasticTypes)
    await Product.create(products)
    await VoluntaryDropPoint.create(voluntaryDropPoints)
    await GarbageType.create(garbageTypes)
    await NutriScore.create(nutriScores)
    await EcoScore.create(ecoScores)
    await Additive.create(additives)
    await NovaScore.create(novaScores)
    await Enseigne.create(enseignes)
    await PriceReccord.create(priceReccords)

    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany()
   
    await Message.deleteMany()


    await ProductCategory.deleteMany()


   
    await PlasticType.deleteMany()
    await Product.deleteMany()
    await ProductCategory.deleteMany()
    await VoluntaryDropPoint.deleteMany()
    await GarbageType.deleteMany()
    await NutriScore.deleteMany()
    await EcoScore.deleteMany()
    await Additive.deleteMany()
    await NovaScore.deleteMany()
    await Enseigne.deleteMany()
    await PriceReccord.deleteMany()

    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
