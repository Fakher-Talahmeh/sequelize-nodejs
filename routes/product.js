const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.post("/product", (req, res, next) => {
  Product.create({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
  })
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((err) => {
      console.error("Error creating product:", err);
      res.status(400).send({ error: err.message });
    });
});

router.get("/product", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.status(200).json(products); 
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      res.status(500).send({ error: err.message });
    });
});

router.get("/product/:id", (req, res, next) => {
  const productId = req.params.id;
  console.log(productId);

  if (isNaN(productId)) {
    return res.status(400).send({ error: "Invalid product ID" });
  }

  Product.findByPk(productId)
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).send({ error: "Product not found" }); 
      }
    })
    .catch((err) => {
      console.error("Error fetching product:", err);
      res.status(500).send({ error: err.message }); 
    });
});

router.put("/product/:id", (req, res, next) => {
  const productId = req.params.id;
  const { title, imageUrl, price, description } = req.body;

  if (isNaN(productId)) {
    return res.status(400).send({ error: "Invalid product ID" });
  }

  Product.findByPk(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).send({ error: "Product not found" });
      }

      return product.update({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
      });
    })
    .then((updatedProduct) => {
      res.status(200).json(updatedProduct); 
    })
    .catch((err) => {
      console.error("Error updating product:", err);
      res.status(500).send({ error: err.message }); 
    });
});
router.delete("/product/:id", (req, res, next) => {
  const productId = req.params.id;

  if (isNaN(productId)) {
    return res.status(400).send({ error: "Invalid product ID" });
  }

  Product.findByPk(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).send({ error: "Product not found" });
      }
      console.log("test");
      return product.destroy();
    })
    .then(() => {
      res.status(200).send({ message: "Product deleted successfully" }); 
    })
    .catch((err) => {
      console.error("Error deleting product:", err);
      res.status(500).send({ error: err.message }); 
    });
});
exports.routes = router;
