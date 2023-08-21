const db = require("../../dbData/models");
const crypto = require("crypto");
const braintree = require("braintree");
const sandBox = {
  server: "api.sandbox.braintreegateway.com",
  port: "443",
  authUrl: "https://auth.sandbox.venmo.com",
  ssl: true,
  graphQLServer: "payments.sandbox.braintree-api.com",
  graphQLPort: "443",
};
const gateway = new braintree.BraintreeGateway({
  environment: sandBox,
  merchantId: process.env.MerchantId,
  publicKey: process.env.PublicKey,
  privateKey: process.env.PrivateKey,
});

exports.placeOrder = async (req, res) => {
  try {
    const { payment_method_nonce, amount, selectedCurrency } = req.body;
    const transaction = await gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: payment_method_nonce,
      options: {
        submitForSettlement: true,
      },
    });
    if (!transaction.success) {
      return res.status(200).json({
        msg: "Transaction Error.",
        response: transaction.success,
      });
    }
    const creditCardInfo = transaction.transaction.creditCard;
    await db.Order.create({
      customerName: creditCardInfo.cardholderName,
      amount,
      currency: selectedCurrency,
      cardHolderName: creditCardInfo.cardholderName,
      cardNumber: creditCardInfo.maskedNumber,
      cardExpiry: creditCardInfo.expirationDate,
      cardType: creditCardInfo.cardType,
      response: transaction.success,
      transactionId: transaction.transaction.id,
    });
    return res.status(200).json({
      msg: "Order created successfully.",
      response: transaction.success,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Server Error.",
      response: error,
    });
  }
};
