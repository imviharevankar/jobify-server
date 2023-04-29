const db = require("../models");
const { decodeJwt } = require("../helpers/cipher");
const httpStatusConfig = require("../config/httpStatus.config");
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {

  const userBody = decodeJwt(req.body.token);

  User.findOne({
    email: userBody.email,
  }).exec((err, user) => {
    // if (err) {
    //   res.status(500).send({ message: err });
    //   return;
    //}
    if (user) {
      return res.status(httpStatusConfig.DUPLICATE_DATA).send({ message: "Account already exists" });
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail,
};

module.exports = verifySignUp;
