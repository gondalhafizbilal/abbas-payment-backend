const express = require("express");
const order = express.Router();
const orderController = require("../controller/order");

order.post("/", orderController.placeOrder);

module.exports = { order };
