const randomBytes = require("randombytes")
const Bitcoin = require("bitcoincashjs-lib")

export class Crypto {
  static sha256(buffer: Buffer): Buffer {
    return Bitcoin.crypto.sha256(buffer)
  }

  static ripemd160(buffer: Buffer): Buffer {
    return Bitcoin.crypto.ripemd160(buffer)
  }

  static hash256(buffer: Buffer): Buffer {
    return Bitcoin.crypto.hash256(buffer)
  }

  static hash160(buffer: Buffer): Buffer {
    return Bitcoin.crypto.hash160(buffer)
  }

  static randomBytes(size: number = 16): Buffer {
    return randomBytes(size)
  }
}
