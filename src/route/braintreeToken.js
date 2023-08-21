const express = require("express");
const braintreeToken = express.Router();
const { genrateToken } = require("../controller/braintreeToken");

braintreeToken.get("/", genrateToken);

module.exports = { braintreeToken };
