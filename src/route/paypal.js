const express = require("express");
const paypal = express.Router();
const paypalController = require("../controller/paypal");

paypal.post("/create-payment", paypalController.create);
paypal.get("/success", paypalController.success);
paypal.get("/cancel", paypalController.cancel);

module.exports = { paypal };
