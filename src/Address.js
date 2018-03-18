// import Address from '../models/Address';
import Crypto from './Crypto';
import HDNode from './HDNode';
import Mnemonic from './Mnemonic';

import Bitcoin from 'bitcoinjs-lib';
import bchaddr from 'bchaddrjs';
import sb from 'satoshi-bitcoin';
import bitcoinMessage from 'bitcoinjs-message';
import randomBytes from 'randombytes';
import bs58 from 'bs58';
import bip21 from 'bip21';

class Address {

  // Translate address from any address format into a specific format.
  toLegacyAddress(address) {
    return bchaddr.toLegacyAddress(address);
  }

  toCashAddress(address) {
    return bchaddr.toCashAddress(address);
  }

  // Test for address format.
  isLegacyAddress(address) {
    return bchaddr.isLegacyAddress(address);
  }

  isCashAddress(address) {
    return bchaddr.isCashAddress(address);
  }

  // Test for address network.
  isMainnetAddress(address) {
    if(address[0] === 'x') {
      return true
    } else if(address[0] === 't') {
      return false
    } else {
      return bchaddr.isMainnetAddress(address);
    }
  }

  isTestnetAddress(address) {
    if(address[0] === 'x') {
      return false
    } else if(address[0] === 't') {
      return true
    } else {
      return bchaddr.isTestnetAddress(address);
    }
  }

  // Test for address type.
  isP2PKHAddress(address) {
    return bchaddr.isP2PKHAddress(address);
  }

  isP2SHAddress(address) {
    return bchaddr.isP2SHAddress(address);
  }

  // Detect address format.
  detectAddressFormat(address) {
    return bchaddr.detectAddressFormat(address);
  }

  // Detect address network.
  detectAddressNetwork(address) {
    if(address[0] === 'x') {
      return 'mainnet'
    } else if(address[0] === 't') {
      return 'testnet'
    } else {
      return bchaddr.detectAddressNetwork(address);
    }
  }

  // Detect address type.
  detectAddressType(address) {
    return bchaddr.detectAddressType(address);
  }
}

export default Address;
