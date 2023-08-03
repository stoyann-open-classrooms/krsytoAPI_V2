const mongoose = require("mongoose");


const MarqueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    subname: {
      type: String,
      unique: true,
      trim: true,
      maxlength: [50, "sub Name can not be more than 50 characters"],
    },

    details: {
        type: String,
        maxlength: [300, 'Remarque cannot be more than 300 characters'],
        default: 'Aucun détail pour ce déchet',
      },
      
    country: {
      type: String,
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
