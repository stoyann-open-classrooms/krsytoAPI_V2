const mongoose = require("mongoose");


const ProductFamillySchema = new mongoose.Schema(
    
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      unique: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
  
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("ProductFamilly", ProductFamillySchema);
