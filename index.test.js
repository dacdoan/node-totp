// Test from https://github.com/bellstrand/totp-generator/blob/505859524170329e42f7018fa329d116f706fc7f/test/index.spec.js
// Under https://github.com/bellstrand/totp-generator/blob/505859524170329e42f7018fa329d116f706fc7f/LICENSE

let totp = require("./index")

describe("totp generation", () => {
  it("should generate token with date now = 2016", () => {
    global.Date.now = () => 1465324707000
    expect(totp("JBSWY3DPEHPK3PXP")).toEqual("341128")
  })

  it("should generate token with a leading zero", () => {
    global.Date.now = () => 1365324707000
    expect(totp("JBSWY3DPEHPK3PXP")).toEqual("089029")
  })

  it("should generate token from a padded base32 key", () => {
    global.Date.now = () => 1465324707000
    expect(totp("CI2FM6EQCI2FM6EQKU======")).toEqual("984195")
  })

  it("should generate even if key contains an invalid character", () => {
    global.Date.now = () => 1465324707000
    expect(totp("JBSWY3DPEHPK3!@#")).toEqual("733617")
  })

  it("should generate longer-lasting token with date now = 2016", () => {
    global.Date.now = () => 1465324707000
    expect(totp("JBSWY3DPEHPK3PXP", { period: 60 })).toEqual("313995")
  })

  it("should generate longer token with date now = 2016", () => {
    global.Date.now = () => 1465324707000
    expect(totp("JBSWY3DPEHPK3PXP", { digits: 8 })).toEqual("43341128")
  })

  it("should generate SHA512-based token with date now = 2016", () => {
    global.Date.now = () => 1465324707000
    expect(totp("JBSWY3DPEHPK3PXP", { algorithm: "SHA512" })).toEqual("093730")
  })

  it("should generate token with timestamp from options", () => {
    expect(totp("JBSWY3DPEHPK3PXP", { timestamp: 1465324707000 })).toEqual("341128")
  })

  it("should return all values when values is less then digits", () => {
    global.Date.now = () => 1634193300000
    expect(totp("3IS523AYRNFUE===", { digits: 9 })).toEqual("97859470")
  })

  it("should trigger leftpad fix", () => {
    global.Date.now = () => 12312354132421332222222222
    expect(totp("JBSWY3DPEHPK3PXP")).toEqual("895896")
  })
})
