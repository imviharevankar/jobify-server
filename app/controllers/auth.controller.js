const config = require("../config/auth.config");
const models = require("../models");
const User = models.user;

const bcrypt = require("bcryptjs");
const { decodeJwt, encodeJwt } = require("../helpers/cipher");
const httpStatusConfig = require("../config/httpStatus.config");

exports.signup = (req, res) => {
  const userBody = decodeJwt(req.body.token);
  console.log(userBody);
  const user = new User({
    firstName: userBody.firstName,
    lastName: userBody.lastName,
    email: userBody.email,
    password: bcrypt.hashSync(userBody.password, 8),
    country: userBody.country,
    isClient: userBody.isClient
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: "Saving Error" });
      return;
    }

    const tokenBody = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      country: user.country,
      isClient: user.isClient,
    }

    const token = encodeJwt(tokenBody, config.secret, 86400);

    res.status(httpStatusConfig.OK).send({
      token,
    });
  });
};

exports.signin = (req, res) => {
  const userBody = decodeJwt(req.body.token);
  User.findOne({
    email: userBody.email,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (!user) {
      return res.status(404).send({ message: "Invalid User" });
    }

    const isValidPassword = bcrypt.compareSync(userBody.password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password",
      });
    }

    const tokenBody = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      country: user.country,
      isClient: user.isClient,
      createdAt: user.createdAt,
    }
    const token = encodeJwt(tokenBody, config.secret, 86400);

    res.status(httpStatusConfig.OK).send({
      token,
    });
  });
};
