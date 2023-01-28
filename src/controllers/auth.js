const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function authenticate(email, password, fn) {
  if (!module.parent) console.log("authenticating %s:%s", email, password);

  const user = await User.findOne({ where: { email } });

  if (!user) return fn(null, null);

  bcrypt.compare(password, user.password, (err, success) => {
    if (err) return fn(err);

    if (success) return fn(null, user);

    fn(null, null);
  });
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = "Login to access " + req.originalUrl;
    res.redirect("/login?redirectTo=" + req.originalUrl);
  }
}

const authController = {
  authenticate,
  restrict,
};

module.exports = authController;
