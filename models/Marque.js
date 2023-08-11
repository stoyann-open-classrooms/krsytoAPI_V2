const mongoose = require("mongoose");


const MarqueSchema = new mongoose.Schema(
  {

    ProductCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
    },


    name: {
      type: String,
      required: [true, "Please add a name"],
      maxlength: [50, "Name can not be more than 50 characters"],
    },

    groupe: {
      type: String,
      trim: true,
      maxlength: [50, "sub Name can not be more than 50 characters"],
    },

    details: {
        type: String,
        maxlength: [300, 'Remarque cannot be more than 300 characters'],
        default: 'Aucun détail pour cette marque',
      },
      
    local: {
      type: Boolean,
      defautlt : false
    },

    photo: { type: String, default: "no-photo.png" },

    web: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Marque", MarqueSchema);
