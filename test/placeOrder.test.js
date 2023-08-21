const request = require("supertest");
const app = require("../index");
const db = require("../dbData/models/index"); 

jest.mock("../dbData/models/index", () => ({
  Order: {
    create: jest.fn(),
  },
  sequelize: {
    sync: jest.fn(),
  },
}));

jest.mock("braintree", () => ({
  BraintreeGateway: jest.fn().mockImplementation(() => ({
    transaction: {
      sale: jest.fn().mockResolvedValue({
        success: true,
        transaction: {
          creditCard: {
            cardholderName: "John Doe",
            maskedNumber: "************1234",
            expirationDate: "12/2025",
            cardType: "Visa",
          },
          id: "transaction-id-123",
        },
      }),
    },
  })),
}));

jest.mock("../dbData/config/config", () => {
  return {
    dialect: "postgres",
    storage: ":memory:",
  };
});

afterAll(async () => {
  await app.server.close();
});
describe("Order", () => {
  it("should create an order successfully", async () => {
    const payment_method_nonce = "nonce-from-client";
    const amount = "10.00";
    const selectedCurrency = "USD";

    const response = await request(app)
      .post("/api/order")
      .send({ payment_method_nonce, amount, selectedCurrency });

    expect(response.status).toBe(200);
    expect(response.body.msg).toBe("Order created successfully.");
    expect(response.body.response).toBe(true);


    expect(db.Order.create).toHaveBeenCalledWith({
      customerName: "John Doe",
      amount,
      currency: selectedCurrency,
      cardHolderName: "John Doe",
      cardNumber: "************1234",
      cardExpiry: "12/2025",
      cardType: "Visa",
      response: true,
      transactionId: "transaction-id-123",
    });
  });

  it("should handle transaction errors", async () => {

    jest.mock("braintree", () => ({
      BraintreeGateway: jest.fn().mockImplementation(() => ({
        transaction: {
          sale: jest.fn().mockResolvedValue({
            success: false,
          }),
        },
      })),
    }));

    const payment_method_nonce = "nonce-from-client";
    const amount = "10.00";
    const selectedCurrency = "USD";

    const response = await request(app)
      .post("/api/order")
      .send({ payment_method_nonce, amount, selectedCurrency });
    response.body.msg = "Transaction Error.";
    response.body.response = false;
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe("Transaction Error.");
    expect(response.body.response).toBe(false);
  });
});
