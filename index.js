const express = require("express");
const hash = require("pbkdf2-password")();
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const infoController = require("./src/controllers/info");
const settingController = require("./src/controllers/setting");
const Info = require("./src/models/Info");
const User = require("./src/models/User");
const routes = require("./src/routes");
const dotenv = require("dotenv");
const authController = require("./src/controllers/auth");
const { auth } = require("./src/routes");
const Category = require("./src/models/Category");
const Product = require("./src/models/Product");

dotenv.config();

const app = express();

// config

// app.use("/static", express.static("public"));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "istyles dont share it, very secret",
  })
);

// db connection
require("./src/database/connection");

// connect to db
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

// path to url convertor1
function path2URL(p) {
  p = p.replace("\\", "/");
  p = p.split(" ").join("%20");
  return p;
}

// Session-persisted message middleware

app.use(async function (req, res, next) {
  const infos = await infoController.getInfo();
  const setting = await settingController.getSetting();
  const categories = await Category.findAll();
  const products = await Product.findAll({ order: [["createdAt", "DESC"]] });

  const globalInfo = {};
  const settings = {};

  infos.map((info) => (globalInfo[info.title] = info.value));
  setting.map((stg) => (settings[stg.setting_name] = stg.setting_value));

  if (!settings.logo) {
    settings.logo = "static/img/istyle.png";
  }

  if (!settings["hero banner"]) {
    settings["hero banner"] = "static/img/istyle-thin-header.png";
  }

  res.locals.basic = {
    route: req.url,
  };

  console.log("=================", settings.logo == null);

  res.locals.title = "ISTYLE";

  res.locals.settings = settings;

  res.locals.globalInfo = globalInfo;

  res.locals.hideSide = false;
  res.locals.hideContent = false;

  res.locals.categories = categories;
  res.locals.products = products;

  res.locals.path2URL = path2URL;

  const err = req.session.error;
  const msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = "";

  if (err) res.locals.message = '<p class="alert alert-danger">' + err + "</p>";
  if (msg)
    res.locals.message = '<p class="alert alert-success">' + msg + "</p>";

  next();
});

// Authenticate using our plain-object database of doom!

app.use(routes);

app.get("/", function (req, res) {
  //   console.log(process.env.JWTSecret);
  res.render("index", {
    name: "istyle",
  });
});

// app.use("/admin", authController.restrict, routes.admin);
// app.use("/create", routes.create);

/* istanbul ignore next */
if (!module.parent) {
  app.listen(5000);
  console.log("Express started on port 3000");
}
