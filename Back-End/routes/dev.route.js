const { application } = require("express");
const express = require("express");
// const { auth } = require("../middleware/auth.middleware");
const { DevModel } = require("../models/dev.modul");

const devRoute = express.Router();
// devRoute.use(auth);
devRoute.get("/alldev/:userId", async (req, res) => {
  try {
    const devData = await DevModel.find({ userId: req.params.userId });
    console.log("dev=", devData);
    res.status(200).send(devData);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

devRoute.post("/add", async (req, res) => {
  const body = req.body;
  try {
    const devData = new DevModel(body);
    await devData.save();
    res.status(200).send({ msg: "One Data added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

devRoute.patch("/update/:userId", async (req, res) => {
  const payload = req.body;
  const userId = req.params.userId;
  console.log("id=", userId);
  try {
    await DevModel.findByIdAndUpdate({ _id: userId }, payload);
    res.status(200).send({ msg: "detail is upadated" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

devRoute.delete("/delete/:userId", async (req, res) => {
  try {
    await DevModel.findByIdAndDelete({ _id: req.params.userId });
    res.status(400).send({ msg: "Dev details Deleted" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { devRoute };
