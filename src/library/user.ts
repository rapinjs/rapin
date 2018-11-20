import * as jwt from 'jsonwebtoken'
import { toPlainObject, toString, isEmpty } from 'lodash'

export default class User {
  public registry: any
  public db: any
  public crypto: any
  public token: string
  public userId: number
  public firstName: string
  public middleName: string
  public lastName: string
  public email: string
  public telephone: string
  public image: string
  public roleType: string
  constructor(registry) {
    this.registry = registry
    this.db = this.registry.get('db')
    this.crypto = this.registry.get('crypto')

    this.token = ''
    this.userId = 0
    this.firstName = ''
    this.middleName = ''
    this.lastName = ''
    this.email = ''
    this.telephone = ''
    this.image = ''
    this.roleType = ''
  }

  public login(email: string, password: string, override: boolean = false) {
    const user = this.db.findOne('User', {email})
    const passwordHash = this.crypto.getHashPassword(password, user.salt)

    const userInfo = this.db.findOne('User', {email, password: passwordHash.hash, salt: passwordHash.salt})

    if (!isEmpty(userInfo) || override) {
      this.token = jwt.sign(toPlainObject(userInfo), process.env.SECRET_KEY, {
        expiresIn: 21600,
      })

      this.userId = userInfo.id
      this.firstName = userInfo.firstName
      this.middleName = userInfo.middleName
      this.lastName = userInfo.lastName
      this.email = userInfo.email
      this.telephone = userInfo.telephone
      this.image = userInfo.image
      this.roleType = userInfo.roleId

      return this.token
    } else {
      return false
    }
  }

  public verify(token) {
    try {
      const user: any = jwt.verify(token, toString(process.env.SECRET_KEY))

      const userInfo = this.db.findOne('User', {email: user.email})

      if (userInfo) {
        this.token = token
        this.userId = userInfo.id
        this.firstName = userInfo.firstName
        this.middleName = userInfo.middleName
        this.lastName = userInfo.lastName
        this.email = userInfo.email
        this.telephone = userInfo.telephone
        this.image = userInfo.image
        this.roleType = userInfo.roleId

        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }

  public getId() {
    return this.userId
  }

  public getFirstName() {
    return this.firstName
  }

  public getMiddleName() {
    return this.middleName
  }

  public getLastName() {
    return this.lastName
  }

  public getEmail() {
    return this.email
  }

  public getTelephone() {
    return this.telephone
  }

  public getImage() {
    return this.image
  }

  public getRoleType() {
    return this.roleType
  }

  public isLogged() {
    return !!this.token
  }
}
