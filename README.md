# node-totp
Zero dependency node.js package for generating totp (Google Authenticator)

## Install
```sh
npm install git+ssh://git@github.com:dacdoan/node-totp.git
```

## Using
Ref: https://github.com/bellstrand/totp-generator
```js
const totp = require("node-totp")
console.log(totp('JBSWY3DPEHPK3PXP'))
```
