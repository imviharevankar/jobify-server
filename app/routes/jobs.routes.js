const { authJwt } = require("../middlewares");

module.exports = (app) => {
  const jobs = require("../controllers/jobs.controller");

  const router = require("express").Router();

  router.post("/", jobs.create);
  router.get("/", jobs.findAll);
  router.get("/:id", jobs.findOne)
  router.patch("/", jobs.update),
    router.delete("/", jobs.delete);

  app.use(
    "/api/jobs",
    [
      // authJwt.verifyToken
    ],
    router);
};
