const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("admin/index");
});

router.get("/products", function (req, res, next) {
  res.render("admin/products");
});

module.exports = router;
