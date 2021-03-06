console.log("[START loading paintroute]");
const express = require("express");
const router = express.Router();
const controller = require("../controllers/paintController");
router.get("/", controller.getList);
router.get("/:id", controller.getSingle);
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);
console.log("[END loading paintroute]");
module.exports = router;
