const models = require("../models");
const httpStatusConfig = require("../config/httpStatus.config");

const Dropdown = models.dropdown;

exports.findAll = (req, res) => {
  // let token = req.headers["x-access-token"];
  // const id = jwtDecode(token);

  Dropdown.find()
    .then((data) => {
      res.status(httpStatusConfig.OK).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Something went wrong",
      });
    });
};

