import Bitcoin from 'bitcoinjs-lib';
import bchaddr from 'bchaddrjs';

class TransactionBuilder {
  constructor(network = 'bitcoincash') {
    if(network === 'bitcoincash') {
      network = 'bitcoin';
    }
    this.keyPairs = [];
    this.transaction = new Bitcoin.TransactionBuilder(Bitcoin.networks[network]);
  }

  addInput(txid, vin, keyPair) {
    let defaultSequence = 0xffffffff;
    let pubkey = keyPair.getPublicKeyBuffer();
    let pubKeyHashBuffer = Bitcoin.crypto.hash160(pubkey);
    let scriptPubKey = Bitcoin.script.pubKeyHash.output.encode(pubKeyHashBuffer);
    this.keyPairs.push(keyPair)

    this.transaction.addInput(
      txid,
      vin,
      defaultSequence,
      scriptPubKey
    );
  }

  addOutput(address, amount) {
    this.transaction.addOutput(bchaddr.toLegacyAddress(address), amount);
  }

  sign(vin, originalAmount) {
    this.transaction.enableBitcoinCash(true);

    this.transaction.setVersion(2);

    let sighashAll = 0x01;
    let sighashBitcoinCashBIP143 = 0x40;

    let hashType = sighashAll | sighashBitcoinCashBIP143;

    this.transaction.sign(vin, this.keyPairs[vin], null, hashType, originalAmount);
  }

  build() {
    return this.transaction.build();
  }

  static createMultisigAddress(required, pubKeys) {
    let pks = [];
    pubKeys.forEach((pk) => {
      pks.push(pk);
    });

    let redeemScript = Bitcoin.script.multisig.output.encode(required, pks.map(function (hex) { return Buffer.from(hex, 'hex') }));
    let scriptPubKey = Bitcoin.script.scriptHash.output.encode(Bitcoin.crypto.hash160(redeemScript));
    return bchaddr.toCashAddress(Bitcoin.address.fromOutputScript(scriptPubKey));
  }
}

export default TransactionBuilder;
