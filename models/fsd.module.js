const mongoose = require("mongoose");

const fsdSchema = mongoose.Schema(
  {
    email: String,
    pass: String,
    name: String,
    age: Number,
  },
  {
    versionKey: false,
  }
);

const FsdModel = mongoose.model("fsdapp", fsdSchema);

module.exports = { FsdModel };
