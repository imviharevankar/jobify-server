const { encodeJwt } = require("./cipher");

exports.getUserToken = (user, secret, expiresIn) => {
  const tokenBody = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    location: user.location,
    isClient: user.isClient,
    amountEarned: user.amountEarned,
    amountSpent: user.amountSpent,
    jobsPosted: user.jobsPosted,
    jobsAssigned: user.jobsAssigned,
  }

  return encodeJwt(tokenBody, secret, expiresIn);
}