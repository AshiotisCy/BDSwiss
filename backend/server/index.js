require("dotenv").config();

const express = require("express");
const bp = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const usersRouter = require("../routes/users");
const passport = require("passport");
const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:admin@users.yrd0tms.mongodb.net/?retryWrites=true&w=majority"
),
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use("/users", usersRouter);

app.listen(3001, () => console.log("Server has started..."));
