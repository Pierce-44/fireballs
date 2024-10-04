const express = require("express");
const router = express.Router();
const exampleController = require("../controllers/fireballController");

router.get("/", exampleController.getExample);

module.exports = router;
