const chai = require("chai")
const assert = chai.assert
import axios from "axios";
import * as sinon from "sinon";

// TODO: port from require to import syntax
const BITBOX = require("../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()
const Block = require("../../lib/Block").Block
const resturl = require("../../lib/BITBOX").resturl

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe("#Block", () => {
  describe("#BlockConstructor", () => {
    it("should create instance of Block", () => {
      const block = new Block()
      assert.equal(block instanceof Block, true)
    })
  })

  it("should have a restURL property", () => {
    const block = new Block()
    assert.equal(block.restURL, resturl)
  })

  describe("#detailsByHash", () => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should get block details", async () => {
      const data = {
        hash:
          "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0",
        size: 216,
        height: 507,
        version: 1,
        merkleroot:
          "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8",
        tx: [
          "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8"
        ],
        time: 1231973656,
        nonce: 330467862,
        bits: "1d00ffff",
        difficulty: 1,
        chainwork:
          "000000000000000000000000000000000000000000000000000001fc01fc01fc",
        confirmations: 528402,
        previousblockhash:
          "00000000a99525c043fd7e323414b60add43c254c44860094048f9c01e9a5fdd",
        nextblockhash:
          "000000000d550f4161f2702165fdd782ec72ff9c541f864ebb8256b662b7e51a",
        reward: 50,
        isMainChain: true,
        poolInfo: {}
      }
      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      const result = await bitbox.Block.detailsByHash(
        "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0"
      )

      assert.deepEqual(result, data)
    })
  })

  describe("#detailsByHeight", () => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should get block details", async () => {
      const data = {
        hash:
          "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0",
        size: 216,
        height: 507,
        version: 1,
        merkleroot:
          "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8",
        tx: [
          "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8"
        ],
        time: 1231973656,
        nonce: 330467862,
        bits: "1d00ffff",
        difficulty: 1,
        chainwork:
          "000000000000000000000000000000000000000000000000000001fc01fc01fc",
        confirmations: 528402,
        previousblockhash:
          "00000000a99525c043fd7e323414b60add43c254c44860094048f9c01e9a5fdd",
        nextblockhash:
          "000000000d550f4161f2702165fdd782ec72ff9c541f864ebb8256b662b7e51a",
        reward: 50,
        isMainChain: true,
        poolInfo: {}
      }
      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      const result = await bitbox.Block.detailsByHeight(500007)

      assert.deepEqual(result, data)
    })
  })

  describe(`#detailsByHeight`, () => {
    it(`should GET block details for a given Height`, async () => {
      const block = 500000

      const result = await bitbox.Block.detailsByHeight(block)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, [
        "hash",
        "size",
        "height",
        "version",
        "merkleroot",
        "tx",
        "time",
        "nonce",
        "bits",
        "difficulty",
        "chainwork",
        "confirmations",
        "previousblockhash",
        "nextblockhash",
        "reward",
        "isMainChain",
        "poolInfo"
      ])
    })

    it(`should GET block details for an array of blocks`, async () => {
      const blocks = [500000, 500001]

      const result = await bitbox.Block.detailsByHeight(blocks)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.hasAllKeys(result[0], [
        "hash",
        "size",
        "height",
        "version",
        "merkleroot",
        "tx",
        "time",
        "nonce",
        "bits",
        "difficulty",
        "chainwork",
        "confirmations",
        "previousblockhash",
        "nextblockhash",
        "reward",
        "isMainChain",
        "poolInfo"
      ])
    })

    it(`should throw an error for improper single input`, async () => {
      try {
        const blocks = "asdf"

        await bitbox.Block.detailsByHeight(blocks)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input must be a number or array of numbers.`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const blocks = []
        for (let i = 0; i < 25; i++) blocks.push(500000)

        const result = await bitbox.Block.detailsByHeight(blocks)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe("#detailsByHash", () => {
    it(`should GET block details for a given hash`, async () => {
      const hash =
        "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201"

      const result = await bitbox.Block.detailsByHash(hash)
      //console.log(`result: ${util.inspect(result)}`)

      assert.hasAllKeys(result, [
        "hash",
        "size",
        "height",
        "version",
        "merkleroot",
        "tx",
        "time",
        "nonce",
        "bits",
        "difficulty",
        "chainwork",
        "confirmations",
        "previousblockhash",
        "nextblockhash",
        "reward",
        "isMainChain",
        "poolInfo"
      ])
    })

    it(`should GET block details for an array of hashes`, async () => {
      const hash = [
        "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201",
        "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201"
      ]

      const result = await bitbox.Block.detailsByHash(hash)
      //console.log(`result: ${util.inspect(result)}`)

      assert.isArray(result)
      assert.hasAllKeys(result[0], [
        "hash",
        "size",
        "height",
        "version",
        "merkleroot",
        "tx",
        "time",
        "nonce",
        "bits",
        "difficulty",
        "chainwork",
        "confirmations",
        "previousblockhash",
        "nextblockhash",
        "reward",
        "isMainChain",
        "poolInfo"
      ])
    })

    it(`should throw an error for improper single input`, async () => {
      try {
        const hash = 12345

        await bitbox.Block.detailsByHash(hash)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input must be a string or array of strings`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const data = []
        for (let i = 0; i < 25; i++) {
          data.push(
            "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201"
          )
        }

        const result = await bitbox.Block.detailsByHash(data)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })
})
