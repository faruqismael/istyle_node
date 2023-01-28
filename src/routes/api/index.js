const router = require("express").Router();
const categoryRoutes = require("./category-routes");
const productRoutes = require("./product-routes");
const userRoutes = require("./user-routes");
const createRoutes = require("./create-routes");
const adminRoutes = require("./admin-routes");
const { User } = require("../../models");
const authController = require("../../controllers/auth");

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/contact", function (req, res) {
  res.render("contact");
});

router.get("/about", function (req, res) {
  res.render("about");
});

router.get("/login", function (req, res) {
  if (req.session.user) return res.redirect("back");

  return res.render("login");
});

router.post("/login", function (req, res, next) {
  authController.authenticate(
    req.body.email,
    req.body.password,
    function (err, user) {
      if (err) return next(err);
      if (user) {
        // Regenerate session when signing in
        // to prevent fixation
        req.session.regenerate(function () {
          // Store the user's primary key
          // in the session store to be retrieved,
          // or in this case the entire user object
          req.session.user = user;
          req.session.success =
            "Authenticated as " +
            user.email +
            ' click to <a href="/logout">logout</a>. ' +
            ' You may now access <a href="/admin">/admin</a>.';
          res.redirect("/admin");
        });
      } else {
        req.session.error =
          "Authentication failed, please check your credentials";
        res.redirect("/login");
      }
    }
  );
});

router.get("/logout", function (req, res) {
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function () {
    res.redirect("/");
  });
});

router.get("/me", authController.restrict, async (req, res, next) => {
  let user = await User.findOne({
    where: { id: req.session.user.id },
    attributes: { exclude: ["password"] },
  });
  if (user === null) {
    res.status(404).json({ msg: "User not found" });
  }
  res.status(200).json(user);
});

router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/user", userRoutes);
router.use("/create", createRoutes);
router.use("/admin", authController.restrict, adminRoutes);

module.exports = router;
