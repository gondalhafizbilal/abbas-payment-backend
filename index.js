require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const db = require("./dbData/models");
const { order } = require("./src/route/braintreeOrder");
const { braintreeToken } = require("./src/route/braintreeToken");
const { paypal } = require("./src/route/paypal");
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/api/order", order);
app.use("/api/payment", braintreeToken);
app.use("/api/paypal", paypal);

db.sequelize.sync();
const server = app.listen(port, () => {
  console.log(`Server listen on the port ${port}`);
});

module.exports = app;
module.exports.server = server;
