const router = require("express").Router();
const { WishList } = require("../models/wishlist");
const jwt = require("jsonwebtoken");

router.post("/addToWishList", async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;

    console.log(
      "Received addToWishList request. User ID:",
      userId,
      "Product ID:",
      productId
    );

    let wishlistedProd = await WishList.findOne({ userId: userId });

    if (!wishlistedProd) {
      console.log(
        "User does not have a wishlist. Creating a new wishlist entry."
      );
      let addToWishList = new WishList({
        userId: userId,
        products: [productId],
      });

      await addToWishList.save();
      console.log("Product added to wishlist successfully.");
      res
        .status(200)
        .json({ message: "Product added to wishlist", success: true });
    } else {
      console.log(
        "User already has a wishlist. Adding product to existing wishlist."
      );
      wishlistedProd.products.push(productId);
      await wishlistedProd.save();
      console.log("Product added to wishlist successfully.");
      res
        .status(200)
        .json({ message: "Product added to wishlist", success: true });
    }
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).json({ message: error.message, success: false });
  }
});

router.patch("/deleteFromWishlist", async (req, res) => {
  try {
    const { userId, productId } = req.body; // Changed to req.body
    const deleted = await WishList.findOneAndUpdate(
      { userId: userId },
      { $pull: { products: productId } }, // Changed wishlist to products
      { safe: true }
    ).clone();

    if (!deleted) {
      throw new Error("Something went wrong");
    }
    res.json({ message: "Deleted from wishlist", success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
});

router.get("/isProductWishlisted/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.body; // Changed to req.body
    const product = await WishList.findOne({ userId, products: productId }); // Changed wishlist to products

    if (!product) {
      return res.send({ isWishlisted: false });
    }
    res.send({ isWishlisted: true });
  } catch (error) {
    res.send(error);
  }
});

router.get("/getAllWishlist", async (req, res) => {
  try {
    const userId = req.query.userId;

    // Find the wishlist for the current user
    const wishlist = await WishList.findOne({ userId: userId });

    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    // Respond with the wishlist products
    res.json({ products: wishlist.products, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
