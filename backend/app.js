const path = require("path");
const fs = require("fs");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const postDataRoutes = require("./routes/postDataRoutes");
const adminRoutes = require("./routes/admin");
const superAdminRoutes = require("./routes/superAdmin");
const userRoutes = require("./routes/user");
const databaseRoutes = require("./routes/datebase");

const SERVER_PORT = 8080;
const LOCAL_MONGO_SERVER = "mongodb://127.0.0.1:27017/db-p";
const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}`;

const app = express();

app.use(cors());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/superAdmin", superAdminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/db", databaseRoutes);
app.use("/api/post", postDataRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

mongoose
  .connect(MONGO_URL)
  // .connect(LOCAL_MONGO_SERVER)
  .then(() => {
    console.log("DB Connected!!");
    const server = app.listen(SERVER_PORT, () => {
      console.log(`Live at port ${SERVER_PORT}`);
    });
    const io = require("./socket").init(server);
  })
  .catch((err) => console.log(err));

// mongodb+srv://ali:alihassan5@cluster0.8vsqbst.mongodb.net/sn?retryWrites=true&w=majority
