const crypto = require('crypto');
exports.generateUUID = () => {
  return crypto.randomUUID();
};
