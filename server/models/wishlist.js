const mongoose = require("mongoose");

const WishListSchema = new mongoose.Schema({
  userId: {
    type: String, // Changed to string type
    required: true
  },
  products: [{
    type: String,
    required: true
  }]
});

const WishList = mongoose.model("WishListProduct", WishListSchema);
module.exports =  { WishList };
