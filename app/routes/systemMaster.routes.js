const { authJwt } = require("../middlewares");

module.exports = (app) => {
  const systemMaster = require("../controllers/systemMaster.controller");

  const router = require("express").Router();

  router.get("/", systemMaster.findAll);

  app.use("/api/dropdown", [], router);
};
