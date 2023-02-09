const router = require("express").Router();
const { Product, Category } = require("../../models");

// The `/api/products` endpoint

// get all products
// find all products
// be sure to include its associated Category and Tag data
router.get("/", (req, res) => {
  Product.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Category,
        attributes: ["id", "category_name"],
      },
    ],
  })
    .then((products) => {
      console.log(products[0].stock);
      return res.render("products", { products });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get("/:gender", (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: {
      gender: req.params.gender.toLowerCase(),
    },
    include: [
      {
        model: Category,
        attributes: ["id", "category_name"],
      },
    ],
  })
    .then((dbProductData) => {
      if (!dbProductData) {
        res
          .status(404)
          .json({ message: "No product found for " + req.params.gender });
        return;
      }
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
