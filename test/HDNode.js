let fixtures = require('./fixtures/HDNode.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

describe('#fromSeedBuffer', () => {
  fixtures.fromSeedBuffer.forEach((mnemonic) => {
    it(`should create an HDNode from root seed buffer`, () => {
      let rootSeedBuffer = BITBOX.BitcoinCash.mnemonicToSeedBuffer(mnemonic);
      let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedBuffer(rootSeedBuffer);
      assert.notEqual(hdNode, null);
    });
  });
});

describe('#fromSeedHex', () => {
  fixtures.fromSeedHex.forEach((mnemonic) => {
    it(`should create an HDNode from root seed hex`, () => {
      let rootSeedHex = BITBOX.BitcoinCash.mnemonicToSeedHex(mnemonic);
      let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
      assert.notEqual(hdNode, null);
    });
  });
});

describe('#derive', () => {
  fixtures.derive.forEach((derive) => {
    it(`should derive non hardened child HDNode`, () => {
      let rootSeedHex = BITBOX.BitcoinCash.mnemonicToSeedHex(derive.mnemonic);
      let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
      let childHDNode = hdNode.derive(0);
      assert.equal(BITBOX.BitcoinCash.HDNode.toXPub(childHDNode), derive.xpub);
      assert.equal(BITBOX.BitcoinCash.HDNode.toXPriv(childHDNode), derive.xpriv);
    });
  });
});

describe('#deriveHardened', () => {
  fixtures.deriveHardened.forEach((derive) => {
    it(`should derive hardened child HDNode`, () => {
      let rootSeedHex = BITBOX.BitcoinCash.mnemonicToSeedHex(derive.mnemonic);
      let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
      let childHDNode = hdNode.deriveHardened(0);
      assert.equal(BITBOX.BitcoinCash.HDNode.toXPub(childHDNode), derive.xpub);
      assert.equal(BITBOX.BitcoinCash.HDNode.toXPriv(childHDNode), derive.xpriv);
    });
  });
});

describe('#derivePath', () => {
  describe('derive non hardened Path', () => {
    fixtures.derivePath.forEach((derive) => {
      it(`should derive child HDNode from path`, () => {
        let rootSeedHex = BITBOX.BitcoinCash.mnemonicToSeedHex(derive.mnemonic);
        let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
        let childHDNode = hdNode.derivePath("0");
        assert.equal(BITBOX.BitcoinCash.HDNode.toXPub(childHDNode), derive.xpub);
        assert.equal(BITBOX.BitcoinCash.HDNode.toXPriv(childHDNode), derive.xpriv);
      });
    });
  });

  describe('derive hardened Path', () => {
    fixtures.deriveHardenedPath.forEach((derive) => {
      it(`should derive hardened child HDNode from path`, () => {
        let rootSeedHex = BITBOX.BitcoinCash.mnemonicToSeedHex(derive.mnemonic);
        let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
        let childHDNode = hdNode.derivePath("0'");
        assert.equal(BITBOX.BitcoinCash.HDNode.toXPub(childHDNode), derive.xpub);
        assert.equal(BITBOX.BitcoinCash.HDNode.toXPriv(childHDNode), derive.xpriv);
      });
    });
  });
});

describe('#toXPub', () => {
  fixtures.toXPub.forEach((mnemonic) => {
    it(`should create xpub ${mnemonic.xpub} from an HDNode`, () => {
      let rootSeedHex = BITBOX.BitcoinCash.mnemonicToSeedHex(mnemonic.mnemonic);
      let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
      let xpub = BITBOX.BitcoinCash.HDNode.toXPub(hdNode);
      assert.equal(xpub, mnemonic.xpub);
    });
  });
});

describe('#toXPriv', () => {
  fixtures.toXPriv.forEach((mnemonic) => {
    it(`should create xpriv ${mnemonic.xpriv} from an HDNode`, () => {
      let rootSeedHex = BITBOX.BitcoinCash.mnemonicToSeedHex(mnemonic.mnemonic);
      let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
      let xpriv = BITBOX.BitcoinCash.HDNode.toXPriv(hdNode);
      assert.equal(xpriv, mnemonic.xpriv);
    });
  });
});
// 1. create mnemonic
//   * let mnemonic = BITBOX.BitcoinCash.generateMnemonic(128)
//   * let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(BITBOX.Crypto.randomBytes(32))
// 2. create rootSeed
//   * let rootSeedBuffer = BITBOX.BitcoinCash.mnemonicToSeedBuffer(mnemonic);
//   * let rootSeedHex = BITBOX.BitcoinCash.mnemonicToSeedHex(mnemonic);
// 3. Create HDNode
//   * let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedBuffer(rootSeedBuffer);
//   * let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
// 4. See xpriv and xpub of hdNode
//   * let xpriv = BITBOX.BitcoinCash.HDNode.toXPriv(hdNode);
//   * let xpub = BITBOX.BitcoinCash.HDNode.toXPub(hdNode);
// 5. Derive Children HDNodes
