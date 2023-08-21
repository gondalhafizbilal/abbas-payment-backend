const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // 'sandbox' for testing or 'live' for production
  client_id:
    "Adb9R5GFK5UQnyPHdLtgQ2nsT_NEkDwIvthc41wIek0faFKaPgMQJ7uK0sSRNUyLoUDzouiaVBzVi3xY",
  client_secret:
    "EDg7NS5w3dAn8iLzyuoAYM2hjCBuYkAyScVSnPtdqtlftjAF7hnlk6nViwlnQp3F5FmbEorwnf__Z_-E",
});

exports.create = async (req, res) => {
  const { amount } = req.body; // Get the amount from the request body
  try {
    const payment = {
      intent: "sale",
      payer: {
        payment_method: "credit_card",
        funding_instruments: [
          {
            credit_card: {
              number: "377789554504475", // Replace with your test credit card number
              type: "amex", // Replace with the credit card type (visa, mastercard, etc.)
              expire_month: "04",
              expire_year: "2027",
              cvv2: "4033", // Replace with the CVV of the test credit card
            },
          },
        ],
      },
      transactions: [
        {
          amount: {
            total: "10.00", // Replace with the amount you want to charge
            currency: "EUR", // Replace with the currency code (USD, EUR, etc.)
          },
          description: "Payment for Product XYZ", // Replace with the description of the payment
        },
      ],
    };
    paypal.payment.create(payment, function (error, payment) {
      if (error) {
        console.error("Error creating payment:", error);
      } else {
        console.log("Payment:", payment);
        // Redirect the user to payment approval URL (payment.links[1].href)
      }
    });
    return res.send("aaaaaaa");
  } catch (error) {
    console.error("Error creating PayPal payment:", error);
    res.status(500).json({ error: "Payment creation failed" });
  }
};

exports.success = async (req, res) => {
  const { paymentId, PayerID } = req.query;
  const executePaymentReq = {
    payer_id: PayerID,
  };

  paypal.payment.execute(
    paymentId,
    executePaymentReq,
    async (error, payment) => {
      if (error) {
        console.error("Error executing PayPal payment:", error);
        res.status(500).json({ error: "Payment execution failed" });
      } else {
        // Payment successful
        // You can perform any additional operations here (e.g., updating database, sending email)
        res.json({ success: true, payment });
      }
    }
  );
};

exports.cancel = async (req, res) => {
  res.json({ canceled: true });
};
