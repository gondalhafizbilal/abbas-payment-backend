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
    clientToken: {
      generate: jest.fn().mockResolvedValue({
        clientToken: "SOME_TOKEN",
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
describe("Payment", () => {


  it("TEST_001", async () => {
    const response = await request(app).get("/api/payment");

    expect(response.status).toBe(200);
    expect(response.body).toBe("SOME_TOKEN");
  });
});
