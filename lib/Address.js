'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Address from '../models/Address';


var _Crypto = require('./Crypto');

var _Crypto2 = _interopRequireDefault(_Crypto);

var _HDNode = require('./HDNode');

var _HDNode2 = _interopRequireDefault(_HDNode);

var _Mnemonic = require('./Mnemonic');

var _Mnemonic2 = _interopRequireDefault(_Mnemonic);

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

var _bchaddrjs = require('bchaddrjs');

var _bchaddrjs2 = _interopRequireDefault(_bchaddrjs);

var _satoshiBitcoin = require('satoshi-bitcoin');

var _satoshiBitcoin2 = _interopRequireDefault(_satoshiBitcoin);

var _bitcoinjsMessage = require('bitcoinjs-message');

var _bitcoinjsMessage2 = _interopRequireDefault(_bitcoinjsMessage);

var _randombytes = require('randombytes');

var _randombytes2 = _interopRequireDefault(_randombytes);

var _bs = require('bs58');

var _bs2 = _interopRequireDefault(_bs);

var _bip = require('bip21');

var _bip2 = _interopRequireDefault(_bip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Address = function () {
  function Address() {
    _classCallCheck(this, Address);
  }

  _createClass(Address, [{
    key: 'toLegacyAddress',


    // Translate address from any address format into a specific format.
    value: function toLegacyAddress(address) {
      return _bchaddrjs2.default.toLegacyAddress(address);
    }
  }, {
    key: 'toCashAddress',
    value: function toCashAddress(address) {
      return _bchaddrjs2.default.toCashAddress(address);
    }

    // Test for address format.

  }, {
    key: 'isLegacyAddress',
    value: function isLegacyAddress(address) {
      return _bchaddrjs2.default.isLegacyAddress(address);
    }
  }, {
    key: 'isCashAddress',
    value: function isCashAddress(address) {
      return _bchaddrjs2.default.isCashAddress(address);
    }

    // Test for address network.

  }, {
    key: 'isMainnetAddress',
    value: function isMainnetAddress(address) {
      if (address[0] === 'x') {
        return true;
      } else if (address[0] === 't') {
        return false;
      } else {
        return _bchaddrjs2.default.isMainnetAddress(address);
      }
    }
  }, {
    key: 'isTestnetAddress',
    value: function isTestnetAddress(address) {
      if (address[0] === 'x') {
        return false;
      } else if (address[0] === 't') {
        return true;
      } else {
        return _bchaddrjs2.default.isTestnetAddress(address);
      }
    }

    // Test for address type.

  }, {
    key: 'isP2PKHAddress',
    value: function isP2PKHAddress(address) {
      return _bchaddrjs2.default.isP2PKHAddress(address);
    }
  }, {
    key: 'isP2SHAddress',
    value: function isP2SHAddress(address) {
      return _bchaddrjs2.default.isP2SHAddress(address);
    }

    // Detect address format.

  }, {
    key: 'detectAddressFormat',
    value: function detectAddressFormat(address) {
      return _bchaddrjs2.default.detectAddressFormat(address);
    }

    // Detect address network.

  }, {
    key: 'detectAddressNetwork',
    value: function detectAddressNetwork(address) {
      if (address[0] === 'x') {
        return 'mainnet';
      } else if (address[0] === 't') {
        return 'testnet';
      } else {
        return _bchaddrjs2.default.detectAddressNetwork(address);
      }
    }

    // Detect address type.

  }, {
    key: 'detectAddressType',
    value: function detectAddressType(address) {
      return _bchaddrjs2.default.detectAddressType(address);
    }
  }]);

  return Address;
}();

exports.default = Address;