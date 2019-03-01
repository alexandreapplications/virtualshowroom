"use strict";

// [START functionsimport]
const functions = require("firebase-functions");
// [END functionsimport]

// [START additionalimports]
const cors = require("cors")({
  origin: true
});
// [END additionalimports]

// [START setup firebase]
var admin = require("firebase-admin");

var serviceAccount = require("./keys/paintshowroom-firebase-adminsdk-nsi44-ea9a4b00a9.json");
console.log("[START Inicializing application]");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://paintshowroom.firebaseio.com"
});
console.log("[END Inicializing application]");

// [END setup firebase]

const express = require("express");
//const bodyParser = require("body-parser");
const paintRoute = require("./src/routes/paintRoute");

function setupRoute(route) {
  console.log(`[START configing express ${route}`);
  const app = express();
  app.use(cors);
  // app.use(bodyParser.json());
  app.use("/", route);
  console.log(`[END configing express ${route}`);
  return app;
}

exports.paint = functions.https.onRequest(setupRoute(paintRoute));

// // [START trigger]
// exports.date = functions.https.onRequest((req, res) => {
//   // [END trigger]
//   // [START sendError]
//   // Forbidding PUT requests.
//   if (req.method === "PUT") {
//     return res.status(403).send("Forbidden!");
//   }
//   // [END sendError]

//   // [START usingMiddleware]
//   // Enable CORS using the `cors` express middleware.
//   return cors(req, res, () => {
//     // [END usingMiddleware]
//     // Reading date format from URL query parameter.
//     // [START readQueryParam]
//     let format = req.query.format;
//     // [END readQueryParam]
//     // Reading date format from request body query parameter
//     if (!format) {
//       // [START readBodyParam]
//       format = req.body.format;
//       // [END readBodyParam]
//     }
//     // [START sendResponse]
//     const formattedDate = moment().format(format);
//     console.log("Sending Formatted date:", formattedDate);
//     res.status(200).send(formattedDate);
//     // [END sendResponse]
//   });
// });
// [END all]
