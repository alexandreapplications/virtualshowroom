const express = require("express");
var bodyParser = require("body-parser");
const app = express();
//Rotas
const index = require("./routes/index");
const paintRoute = require("./routes/paintRoute");
app.use(bodyParser.json()); // for parsing application/json
app.use("/", index);
app.use("/paint", paintRoute);
module.exports = app;
