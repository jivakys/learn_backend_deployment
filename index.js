const express = require("express");
const { default: mongoose } = require("mongoose");
// const { auth } = require("./middleware/auth.middleware");
const { devRoute } = require("./routes/dev.route");
const { fsdRoute } = require("./routes/route");
const cors = require("cors");
const { auth } = require("./middleware/auth.middleware");
const app = express();

app.use(express.json());
app.use(cors());
require("dotenv").config();

app.use("/fsd", fsdRoute);
app.use(auth);
app.use("/dev", devRoute);

app.listen(process.env.port, async () => {
  try {
    const connection = mongoose.connect(process.env.mongoURL);
    await connection;
    console.log("FSD Database is connected");
  } catch (error) {
    console.log(error.message);
  }
  console.log(`Server Running at ${process.env.port}`);
});
