const mongoose = require("mongoose");

const devSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    task: { type: String, required: true },
    package: { type: Number, required: true },
    userId: String,
  },
  {
    versionKey: false,
  }
);

const DevModel = mongoose.model("developer", devSchema);

module.exports = { DevModel };
