let fixtures = require('./fixtures/HDNode.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

describe('#fromSeedBuffer', () => {
  fixtures.fromSeedBuffer.forEach((mnemonic) => {
    it(`should create an HDNode from root seed buffer`, () => {
      let rootSeedBuffer = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedBuffer(mnemonic);
      let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedBuffer(rootSeedBuffer);
      assert.notEqual(hdNode, null);
    });
  });
});

describe('#fromSeedHex', () => {
  fixtures.fromSeedHex.forEach((mnemonic) => {
    it(`should create an HDNode from root seed hex`, () => {
      let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(mnemonic);
      let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
      assert.notEqual(hdNode, null);
    });
  });
});

describe('#derive', () => {
  fixtures.derive.forEach((derive) => {
    it(`should derive non hardened child HDNode`, () => {
      let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(derive.mnemonic);
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
      let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(derive.mnemonic);
      let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
      let childHDNode = hdNode.deriveHardened(0);
      assert.equal(BITBOX.BitcoinCash.HDNode.toXPub(childHDNode), derive.xpub);
      assert.equal(BITBOX.BitcoinCash.HDNode.toXPriv(childHDNode), derive.xpriv);
    });
  });

  describe('derive BIP44 $BCH account', () => {
    fixtures.deriveBIP44.forEach((derive) => {
      it(`should derive BIP44 $BCH account`, () => {
        let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(derive.mnemonic);
        let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
        let childHDNode = hdNode.deriveHardened(44).deriveHardened(145).deriveHardened(0);
        assert.equal(BITBOX.BitcoinCash.HDNode.toXPub(childHDNode), derive.xpub);
        assert.equal(BITBOX.BitcoinCash.HDNode.toXPriv(childHDNode), derive.xpriv);
      });
    });
  });
});

describe('#derivePath', () => {
  describe('derive non hardened Path', () => {
    fixtures.derivePath.forEach((derive) => {
      it(`should derive non hardened child HDNode from path`, () => {
        let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(derive.mnemonic);
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
        let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(derive.mnemonic);
        let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
        let childHDNode = hdNode.derivePath("0'");
        assert.equal(BITBOX.BitcoinCash.HDNode.toXPub(childHDNode), derive.xpub);
        assert.equal(BITBOX.BitcoinCash.HDNode.toXPriv(childHDNode), derive.xpriv);
      });
    });
  });

  describe('derive BIP44 $BCH account', () => {
    fixtures.deriveBIP44.forEach((derive) => {
      it(`should derive BIP44 $BCH account`, () => {
        let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(derive.mnemonic);
        let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
        let childHDNode = hdNode.derivePath("44'/145'/0'");
        assert.equal(BITBOX.BitcoinCash.HDNode.toXPub(childHDNode), derive.xpub);
        assert.equal(BITBOX.BitcoinCash.HDNode.toXPriv(childHDNode), derive.xpriv);
      });
    });
  });
});

describe('#getLegacyAddress', () => {
  fixtures.getLegacyAddress.forEach((address) => {
    it(`should get address ${address.address} from HDNode`, () => {
      let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(address.mnemonic);
      let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
      let childHDNode = hdNode.derivePath("0");
      let addy = BITBOX.BitcoinCash.HDNode.getLegacyAddress(childHDNode);
      assert.equal(addy, address.address);
    });
  });
});

describe('#getCashAddress', () => {
  fixtures.getCashAddress.forEach((address) => {
    it(`should get address ${address.address} from HDNode`, () => {
      let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(address.mnemonic);
      let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
      let childHDNode = hdNode.derivePath("0");
      let addy = BITBOX.BitcoinCash.HDNode.getCashAddress(childHDNode);
      assert.equal(addy, address.address);
    });
  });
});

describe('#toXPub', () => {
  fixtures.toXPub.forEach((mnemonic) => {
    it(`should create xpub ${mnemonic.xpub} from an HDNode`, () => {
      let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(mnemonic.mnemonic);
      let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
      let xpub = BITBOX.BitcoinCash.HDNode.toXPub(hdNode);
      assert.equal(xpub, mnemonic.xpub);
    });
  });
});

describe('#toXPriv', () => {
  fixtures.toXPriv.forEach((mnemonic) => {
    it(`should create xpriv ${mnemonic.xpriv} from an HDNode`, () => {
      let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(mnemonic.mnemonic);
      let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
      let xpriv = BITBOX.BitcoinCash.HDNode.toXPriv(hdNode);
      assert.equal(xpriv, mnemonic.xpriv);
    });
  });
});
