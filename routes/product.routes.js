const router = require("express").Router();
const Product = require("../models/Product")
const mongoose = require("mongoose")

router.post("/", async (req, res) => {
  try {
    const { title, description, category,price,quantity } = req.body; 
    const createdProduct = await Product.create({
      title: title,
      description: description,
      category: category,
      price: price,
      quantity: quantity
    });
    res.status(201).json(createdProduct);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "Product with this name already exists" });
    }
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.productId);
    if (!foundProduct) return res.status(404).json({ message: "Product Not Found" });
    res.status(200).json(foundProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:productId", async (req, res) => {
  try {
    const { title, description, category,price,quantity } = req.body; 
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
       title,
       description,
       category,
       price,
       quantity
      },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }

    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "Product with this name already exists" });
    }
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;