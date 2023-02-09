const router = require("express").Router();
const { Subscriber } = require("../../models");

router.post("/", async function (req, res, next) {
  try {
    const sub = await Subscriber.findOne({ where: { email: req.body.email } });

    if (!sub) await Subscriber.create(req.body);

    req.session.success = "Subscribed successfully";
    req.session.subscribed = true;

    return res.redirect("/");
  } catch (error) {
    req.session.error = error.message;
    res.redirect("/");
  }
});

module.exports = router;
