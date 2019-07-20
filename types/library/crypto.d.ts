declare interface PasswordHash {
  salt: string
  hash: string
}

export declare class Crypto {
  getHashPassword(password:string, salt?: string): PasswordHash
  sha512(password:string, salt: string): PasswordHash
  token(length: number): string
}