const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contact: { type: Number, required: true },
  city: { type: String, required: true },
  pincode: { type: Number, required: true },
  address: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("registers", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.passwordComplexity().required().label("Password"),
    contact: Joi.number().required().label("Contact"),
    city: Joi.string().required().label("city"),
    address: Joi.string().required().label("address"),
    pincode: Joi.number().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
