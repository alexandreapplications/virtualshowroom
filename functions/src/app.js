var admin = require("firebase-admin");

var serviceAccount = require("../keys/paintshowroom-firebase-adminsdk-nsi44-ea9a4b00a9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://paintshowroom.firebaseio.com"
});

// [START additionalimports]
const cors = require("cors")({
  origin: true
});
// [END additionalimports]

const express = require("express");
var bodyParser = require("body-parser");
const app = express();
app.use(cors);
app.use(bodyParser.json());
const index = require("./routes/index");
const paintRoute = require("./routes/paintRoute");
app.use("/", index);
app.use("/paint", paintRoute);
module.exports = app;
