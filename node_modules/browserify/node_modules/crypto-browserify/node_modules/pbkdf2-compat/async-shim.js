var compat = require('./browser')

process.on('message', function (m) {
  var result = compat.pbkdf2Sync(m.password, m.salt, m.iterations, m.keylen, m.digest)

  process.send(result.toString('hex'))
})
