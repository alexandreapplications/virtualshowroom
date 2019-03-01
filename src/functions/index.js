"use strict";

// [START functionsimport]
const functions = require("firebase-functions");
// [END functionsimport]

// [START additionalimports]
const cors = require("cors")({
  origin: true
});
// [END additionalimports]

const app = require("../app");

exports.crud = functions.https.onRequest(app);

// [START trigger]
exports.date = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === "PUT") {
    return res.status(403).send("Forbidden!");
  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    // [END usingMiddleware]
    // Reading date format from URL query parameter.
    // [START readQueryParam]
    let format = req.query.format;
    // [END readQueryParam]
    // Reading date format from request body query parameter
    if (!format) {
      // [START readBodyParam]
      format = req.body.format;
      // [END readBodyParam]
    }
    // [START sendResponse]
    const formattedDate = moment().format(format);
    console.log("Sending Formatted date:", formattedDate);
    res.status(200).send(formattedDate);
    // [END sendResponse]
  });
});
// [END all]
