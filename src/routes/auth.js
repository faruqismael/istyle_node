const express = require("express");
const authController = require("../controllers/auth");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser } = require("../controllers/user");

const router = express.Router();

router.get("/logout", function (req, res) {
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function () {
    res.redirect("/");
  });
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

module.exports = router;
