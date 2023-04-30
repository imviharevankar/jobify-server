const { authJwt } = require("../middlewares");

module.exports = (app) => {
  const dropdown = require("../controllers/dropdown.controller");

  const router = require("express").Router();

  router.get("/", dropdown.findAll);

  app.use("/api/dropdown", [], router);
};
