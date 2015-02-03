
module.exports = function (exports, crypto) {
  exports.publicEncrypt = require('./publicEncrypt')(crypto);
  exports.privateDecrypt = require('./privateDecrypt')(crypto);
};