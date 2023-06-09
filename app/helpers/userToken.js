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
    skills: user.skills,
    createdAt: user.createdAt,
  }

  return encodeJwt(tokenBody, secret, expiresIn);
}