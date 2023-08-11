const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
  {
    object: {
      type: String,
      required: [true, `Merci d'ajouter un objet a votre message`],
      trim: true,
      maxlength: [50, 'Name can not be more than 30 characters'],
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    name: {
      type: String,
      trim: true,
      maxlength: [30, 'Name can not be more than 30 characters'],
    },
    lastname: {
      type: String,
      trim: true,
      maxlength: [30, 'Name can not be more than 30 characters'],
    },

    compagny: {
      type: String,
      trim: true,
      maxlength: [30, 'Compagny can not be more than 50 characters'],
    },
    function: {
      type: String,
      trim: true,
      maxlength: [30, 'function can not be more than 50 characters'],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },

    message: {
      type: String,
      maxlength: [5000, 'Message can not be more than 5000 characters'],
    },
    
    status: {
      // Array of strings
      type: String,
      required: true,
      enum: ['not_read', 'Archived'],
      default: 'not_read',
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('Message', MessageSchema)
