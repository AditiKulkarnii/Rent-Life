const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
  const { firstName, email, password, contact, city, pincode, address } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      email,
      password: hashedPassword,
      contact,
      city,
      pincode,
      address,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




module.exports = router;
