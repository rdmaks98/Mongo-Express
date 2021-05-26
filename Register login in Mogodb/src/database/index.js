// here we are getting port and databse compass
require("dotenv").config({ path: "../config" });

// connect database
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("database connect");
  })
  .catch((err) => {
    console.log(err);
  });
