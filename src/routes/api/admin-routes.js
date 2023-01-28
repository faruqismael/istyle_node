const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("admin/index");
});

router.get("/products", function (req, res, next) {
  res.render("admin/products");
});

router.get("/categories", function (req, res, next) {
  res.render("admin/categories");
});

module.exports = router;
