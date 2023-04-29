const jwtDecode = require('jwt-decode');
const jwt = require("jsonwebtoken");

exports.decodeJwt = (token) => {
  return jwtDecode(token);
};

exports.encodeJwt = (body, secret, expiresIn) => {
  return jwt.sign(
    body,
    secret,
    {
      expiresIn,
    }
  );

}