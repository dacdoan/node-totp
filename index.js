const crypto = require('crypto')

module.exports = function getToken(key, options) {
  options = Object.assign({
    period: 30,
    algorithm: 'sha1',
    digits: 6,
    timestamp: Date.now()
  }, options || {})
  let time = leftpad(Math.floor(options.timestamp / 1000 / options.period).toString(16), 16, "0")
  let hmac = crypto.createHmac(options.algorithm, Buffer.from(base32tohex(key), 'hex'))
    .update(Buffer.from(time, 'hex')).digest('hex')
  let offset = parseInt(hmac.slice(-1), 16) << 1
  let otp = parseInt(hmac.substring(offset, offset+8), 16) & 0x7fffffff
  return otp.toString().slice(-options.digits)
}

function base32tohex(base32) {
  let base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bits = "", hex = ""
  base32 = base32.replace(/=+$/, "")
  for (let i = base32.length-1; i > -1; i--) {
    let val = base32chars.indexOf(base32.charAt(i).toUpperCase())
    bits = leftpad(val.toString(2), 5, "0") + bits
  }
  for (let i = 0, n = bits.length; i + 7 < n; i += 8) {
    let chunk = bits.substring(i, i + 8)
    hex += leftpad(parseInt(chunk, 2).toString(16), 2, "0")
  }
  return hex
}

function leftpad(str, len, pad) {
  if (len > str.length) {
    str = Array(len + 1 - str.length).join(pad) + str
  }
  return str
}
