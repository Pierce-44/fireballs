const express = require("express");
const router = express.Router();
const fireballController = require("../controllers/fireballController");

router.get("/", fireballController.getFireballs);

module.exports = router;
