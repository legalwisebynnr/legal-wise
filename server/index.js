const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const customerRoute= require("./routes/customer");
const serviceProviderRoute = require("./routes/serviceProvider");
const jobRoute = require('./routes/jobs');

//configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors({ credentials: true }));


app.use("/api/customer",customerRoute);
app.use("/api/serviceProvider",serviceProviderRoute);
app.use("/api/jobs",jobRoute);

const port = process.env.PORT || 8000;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`server running at ${port}`);
    });
  })
  .catch((err) => {
    console.log("Could not connect to database" + err);
  });

app.get("/", (req, res) => {
  res.send("Hey!");
});