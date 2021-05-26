// here we are fetch port number through config
require("dotenv").config({ path: "./config.env" });

// express require express and make function
const ep = require("express");
const app = ep();

// database connection
require("./database");

// get path
const path = require("path");

// get hbs for design file
const hbs = require("hbs");

// password convert simple to becrpt format
const bcrypt = require("bcrypt");

// fetch table field and use it
const User = require("./models/student");

// get port
const port = process.env.PORT;
const staticPath = path.join(__dirname, "../public");
const dynamicPath = path.join(__dirname, "../template/partial");
const viewPath = path.join(__dirname, "../template/views");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(dynamicPath);
app.use(ep.static(staticPath));

app.use(ep.json());
app.use(ep.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", {});
});

app.get("/registration", (req, res) => {
  res.render("registration", {});
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/success", (req, res) => {
  res.render("success");
});

// user register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, college, erNo, sem } = req.body;
    const userData = new User({
      name,
      email,
      phone,
      password,
      college,
      erNo,
      sem,
    });
    const data = await userData.save();
    if (!data) {
      console.log("data not inserted due to server Error");
    }
    res.status(200).render("login");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// get all user data
app.get("/api", async (req, res) => {
  try {
    const readUser = await User.find({});
    res.json(readUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// user login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate email check here
    if (!email || !password) {
      res.status(422).json({ error: "validation error" });
    }
    const success = await User.findOne({ email });
    if (!success) {
      res.status(422).json({
        error: "Your username and password are incorrect please enter valid",
      });
    } else {
      const isMatch = bcrypt.compare("password", success.password);
      const token = await success.generateAuthToken();
      res.cookie("UserAuthoriation", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (isMatch) {
        res.status(200).render("success");
      } else {
        res.status(422).json({
          error: "Your username and password are incorrect please enter valid",
        });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.listen(port, () => {
  console.log(`your server is connect http:/localhost:${port}`);
});
