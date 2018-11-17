import * as crypto from 'crypto'

export default class Crypto {
  public data: object
  constructor() {
    this.data = {}
  }

  public getHashPassword(password, salt = this.token(9)) {
    return this.sha512(password, salt)
  }

  public sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    const value = hash.digest('hex')
    return {
      salt,
      hash: value,
    }
  }

  public token(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length)
  }
}
