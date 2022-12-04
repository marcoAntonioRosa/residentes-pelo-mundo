require('dotenv').config()
const user = require("./app/routes/user.routes");
const authentication = require("./app/routes/authentication.routes");
const company = require("./app/routes/company.routes");
const testimony = require("./app/routes/testimony.routes");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

const cors = require("cors");
app.use(cors({
  origin: "http://localhost:8081"
}));

app.use('/api/user', user);
app.use('/api', authentication);
app.use('/api/company', company);
app.use('/api/testimony', testimony);

const db = require('./app/models')

// db.sequelize.sync()

// db.sequelize.sync().then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

// db.sequelize.sync({
//     force: true
//   }).then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

app.get("/", (req, res) => {
  res.send({
    message: "Hello World."
  });
});

module.exports = app