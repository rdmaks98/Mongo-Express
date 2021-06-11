const mongoose = require("mongoose");
const config = require("../../config");

mongoose
  .connect(config.MONGO_CONNECTION_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`connection succesfully`);
  })
  .catch((err) => console.log(err));
