const express = require("express");
const upload = require("../controllers/multer");
const productController = require("../controllers/product");
const { createUser } = require("../controllers/user");
const Category = require("../models/Category");
const Product = require("../models/Product");

const router = express.Router();

// USER ----
router.get("/admin", function (req, res) {
  res.render("admin/create/admin.ejs", { name: "s" });
});

router.post("/new-admin", async function (req, res, next) {
  try {
    const { email, password, passwordConfirm, role = "admin" } = req.body;

    if (password !== passwordConfirm) {
      req.session.error = "Password did not match";

      return res.redirect("/create/admin");
    }
    const user = { email, password, role };

    const newUser = await createUser(user);
    req.session.success = "Admin added successfully";

    return res.render("admin/create/admin.ejs", {
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
});

// PRODUCTS ----
router.get("/product", async function (req, res, next) {
  try {
    const categories = await Category.findAll();

    res.render("admin/create/product", { categories });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/new-product",
  upload.array("image", 5),
  async function (req, res, next) {
    try {
      const productImages = req.files.map((img) => img.path).toString();
      console.log(productImages, "--------===============");
      const product = await productController.createProduct(
        Object({ ...req.body, image: productImages }),
        req
      );

      req.session.success = "Product added successfully";

      return res.redirect("/create/product");
    } catch (error) {
      req.session.error = error.message;
      res.redirect("/create/product");
    }
  }
);

module.exports = router;
