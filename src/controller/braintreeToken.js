const braintree = require("braintree");

exports.genrateToken = async (req, res) => {
  try {
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
    const token = await gateway.clientToken.generate({});
    return res.status(200).json(token.clientToken);
  } catch (e) {
    return res.status(500).json(e);
  }
};
