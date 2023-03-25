const express = require("express");
const fsdRoute = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { FsdModel } = require("../models/fsd.module");

//REGISTER
fsdRoute.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;
  try {
    bcrypt.hash(pass, 4, async (err, hash) => {
      const data = new FsdModel({ email, pass: hash, name, age });
      await data.save();
      res.status(200).send({ msg: "dev register successfully" });
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

//LOGIN
fsdRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    let user = await FsdModel.findOne({ email });
    console.log("user", user);
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login Successfully",
            token: jwt.sign({ userId: user._id }, "masai"),
          });
        } else {
          res.status(400).send({ err: "Wrong Credential" });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { fsdRoute };
