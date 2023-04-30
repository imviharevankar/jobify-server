module.exports = (app) => {
  const payment = require("../controllers/payment.controller");

  const router = require("express").Router();

  router.post("/create-order", payment.createOrder);
  router.post("/verify-signature", payment.verifySignature);

  app.use(
    "/api/payment",
    [],
    router);
};
