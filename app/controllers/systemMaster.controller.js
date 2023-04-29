const models = require("../models");
const httpStatusConfig = require("../config/httpStatus.config");

const SystemMaster = models.systemMaster;

exports.findAll = (req, res) => {
  // let token = req.headers["x-access-token"];
  // const id = jwtDecode(token);

  // console.log(req.body.query);

  SystemMaster.find()
    .then((data) => {
      debugger;
      console.log(data);
      res.status(httpStatusConfig.OK).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Something went wrong",
      });
    });
};
