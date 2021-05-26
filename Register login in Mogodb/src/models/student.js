// this function use configartion of databse
const mongoose = require("mongoose");

// this function use for webtoken
const jwt = require("jsonwebtoken");

// this function use for password convert bcrypt
const bcrypt = require("bcrypt");

// here we are make dataschema (table and required field )
const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  sem: {
    type: String,
    required: true,
  },
  erNo: {
    type: String,
    required: true,
  },
  tokens: [
    {
      generatedtoken: {
        type: String,
        required: true,
      },
    },
  ],
});

// here we are covert simple password to bcrypt format
dataSchema.pre("save", async function () {
  if (this.isModified("password")) {
    // console.log(`your password is before hash ${this.password}`);
    this.password = await bcrypt.hash(this.password, 12);
    // console.log(`your password is bcrypt form ${this.password}`);
  }
});

// here we are generate token for store in cookies
dataSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id.toString() }, "R.D.Makvana");
    this.tokens = this.tokens.concat({ generatedtoken: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = new mongoose.model("register-user", dataSchema);
module.exports = User;
