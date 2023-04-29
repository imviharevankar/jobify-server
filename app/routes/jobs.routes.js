const { authJwt } = require("../middlewares");

module.exports = (app) => {
  const jobs = require("../controllers/jobs.controller");

  const router = require("express").Router();

  router.post("/", jobs.create);
  // router.get("/", history.findAll);
  // router.delete("/:id", history.delete);

  app.use(
    "/api/jobs",
    [
      // authJwt.verifyToken
    ],
    router);
};
