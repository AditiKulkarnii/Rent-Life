const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  contact: Number,
  city: String,
  address: String,
  pincode: Number,
});

const StudentModel = mongoose.model("registers", StudentSchema);
module.exports = StudentModel;
