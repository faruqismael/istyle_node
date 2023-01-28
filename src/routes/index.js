// module.exports = {
//   auth: require("./auth"),
//   admin: require("./admin"),
//   create: require("./create"),
// };
const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/", apiRoutes);

router.use((req, res) => {
  res.send("<h1>404 - Wrong Route!</h1>");
});

module.exports = router;
