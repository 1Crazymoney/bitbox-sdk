# `bitbox-cli`

## Command line tool for https://www.bitbox.earth

`bitbox-cli` is a Utility for creating great [Bitcoin Cash](https://www.bitcoincash.org) applications. If can be used from the command line or from within client/server apps.

More documentation available at:

* [General docs](https://www.bitbox.earth/docs/gettingstarted)
* [BITBOX API](https://www.bitbox.earth/bitboxcli)
* [BITBLOG](https://bigearth.github.io/bitblog/)

## Command line Usage

```
Usage: bitbox [options] [command]


Options:

  -V, --version  output the version number
  -h, --help     output usage information


Commands:

  new [options]  The 'bitbox new' command creates a new BITBOX application w/ a
    directory structure and bitbox.js configuration file.

    Pass in command line arguments or optionally specify commonly used arguments in a .bitboxrc file in your home directory

  console [options]   Run a console with Bitcoin Cash RPC commands available
  scaffold [options]  Scaffold out basic apps in major frameworks w/ BITBOX bindings
  paper [options]     Create a paper wallet for easy and safe back up
```

### `new`

Stubs out a directory structure w/ a bitbox.js file that has localhost:8332 settings to connect to your local running BITBOX.

```
Usage: new [options]

The 'bitbox new' command creates a new BITBOX application w/ a
directory structure and bitbox.js configuration file.

Pass in command line arguments or optionally specify commonly used arguments in a .bitboxrc file in your home directory


Options:

  -t, --title <title>        Title of new project
  -e, --environment <environment> environment of running BITBOX instance. Ex: production, staging. Default: development
  -r, --protocol <protocol>  protocol of running BITBOX instance. Default: http
  -o, --host <host>          host of running BITBOX instance. Default: localhost
  -p, --port <port>          port of running BITBOX instance. Default: 8332
  -u, --username <username>  Bitcoin Cash JSON RPC username
  -a, --password <passwore>  Bitcoin Cash JSON RPC password
  -h, --help                 output usage information
```

#### `.bitboxrc`

You can store common settings in a `~/.bitboxrc` in the `ini` format:

```
; bitbox config comment

[new]
protocol = http
host = localhost
port = 8332
username: h4x04
password: l337
```

### `console`

custom REPL w/ the entire BCH RPC on a `BITBOX` object. [Full list](https://www.bitbox.earth/bitboxcli/bitcoincash) of available methods.

```
Usage: console [options]

Run a console with Bitcoin Cash RPC commands available


Options:

  -e, --environment <environment> environment of running BITBOX instance. Ex: production, staging. Default: development
  -h, --help  output usage information
```

### `scaffold`

Quickly scaffold basic applications in major frameworks so you can focus on your app.

```
Usage: scaffold [options]

Scaffold out basic apps in major frameworks w/ BITBOX bindings


Options:

  -f, --framework <framework>  The framework to use. Options include "react", "angular" and "node". Default: "react"
  -r, --repo <repo>            The github repository to use. Ex: https://github.com/bigearth/bitbox-scaffold-react.git
  -h, --help                   output usage information
```

### `paper`

This generates a `paper-wallet.html` file which can be printed for offline storage.

```
Usage: paper [options]

Create a paper wallet for easy and safe back up in cashaddr/legacy encoding and optionally have the mnemonic be in any of 8 languages


Options:

  -e, --encoding <encoding>  The encoding to use. Options include "cashaddr" and "legacy". Default: "cashaddr"
  -l, --language <language>  language of mnemonic. Options: chinese_simplified, chinese_traditional, english, french, italian, japanese, korean, spanish. Default: english
  -h, --help                 output usage information
```

## From within your app

```js
// to use without calling your local BITBOX instance or a remote $BCH node
let BITBOXCli = require('bitbox-cli/lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

BITBOX.BitcoinCash.toSatoshi(9)
// 900000000

BITBOX.BitcoinCash.toBitcoinCash(900000000)
// 9

BITBOX.BitcoinCash.Address.toLegacyAddress('bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
// 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN

BITBOX.BitcoinCash.Address.toCashAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN')
// bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl

BITBOX.BitcoinCash.Address.isLegacyAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// false

BITBOX.BitcoinCash.Address.isCashAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true

BITBOX.BitcoinCash.Address.isMainnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true

BITBOX.BitcoinCash.Address.isTestnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
//false

BITBOX.BitcoinCash.Address.isP2PKHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true

BITBOX.BitcoinCash.Address.isP2SHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// false

BITBOX.BitcoinCash.Address.detectAddressFormat('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// cashaddr

BITBOX.BitcoinCash.Address.detectAddressNetwork('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// mainnet

BITBOX.BitcoinCash.Address.detectAddressType('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');
// p2pkh

BITBOX.BitcoinCash.signMessageWithPrivKey('KxtpRDUJDiutLaTV8Vuavhb6h7zq9YV9ZKA3dU79PCgYmNVmkkvS', "EARTH");
// IIYVhlo2Z6TWFjYX1+YM+7vQKz0m+zYdSe4eYpFLuAQDEZXqll7lZC8Au22VI2LLP5x+IerZckVk3QQPsA3e8/8=

BITBOX.BitcoinCash.verifyMessage('bitcoincash:qp2zvw3zpk5xx43w4tve7mtekd9kaxwj4uenq9eupv', 'IIYVhlo2Z6TWFjYX1+YM+7vQKz0m+zYdSe4eYpFLuAQDEZXqll7lZC8Au22VI2LLP5x+IerZckVk3QQPsA3e8/8=', 'EARTH')
// true

// Generate mnemonics in 8 different languages. Defaults to English
BITBOX.BitcoinCash.mnemonicWordLists();
// {
//   chinese_simplified: [],
//   chinese_traditional: [],
//   english: [],
//   french: [],
//   italian: [],
//   japanese: [],
//   korean: [],
//   spanish: []
// }

BITBOX.BitcoinCash.Mnemonic.generateMnemonic(128);
// boil lonely casino manage habit where total glory muffin name limit mansion

BITBOX.BitcoinCash.Mnemonic.entropyToMnemonic('f379da02cc426e6e26430d25e6cc372dfd0a1a2e4a33ac4dc6ae6d56017f642d')
// vibrant solution level obtain cheap damage october giant chalk cushion assist fossil spawn artist rice edit proof hotel process survey gas sausage mouse property

BITBOX.BitcoinCash.mnemonicToEntropy('boil lonely casino manage habit where total glory muffin name limit mansion');
// 1910748dc37683f4b9731c91325a07c3

BITBOX.BitcoinCash.validateMnemonic('boil lonely casino manage habit where total glory muffin name limit mansion')
// true

// translate mnemonics between langugaes
// create korean mnemonic
let koreanMnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256, BITBOX.BitcoinCash.mnemonicWordLists().korean);
// 상대 조직 피곤 기간 장면 저런 서쪽 신고 연예인 고춧가루 활짝 세종대왕 거울 대충 벨트 제일 저곳 남녀 수술 수학 학원 금년 유학 인공
// translate it to spanish
let spanishMnemonic = BITBOX.BitcoinCash.translateMnemonic(koreanMnemonic, 'korean', 'spanish')
// gato razón torero bobina pintor poema grieta leer mirar aparato vivaz hembra alambre cielo esencia rabia poder buscar incapaz instante trofeo bicho oído pájaro
// translate back to korean
let koreanMnemonic2 = BITBOX.BitcoinCash.translateMnemonic(spanishMnemonic, 'spanish', 'korean')
// 상대 조직 피곤 기간 장면 저런 서쪽 신고 연예인 고춧가루 활짝 세종대왕 거울 대충 벨트 제일 저곳 남녀 수술 수학 학원 금년 유학 인공


BITBOX.BitcoinCash.mnemonicToSeedHex('boil lonely casino manage habit where total glory muffin name limit mansion', '');
// e906236ab5ebec8fbff9948807a6f5d2aa6f35e8bcbcda99e22f9048323cdc0755b781782ee1cce40007bcf900593ed2667e6e9800d734fa46a8f7f51ec74818

BITBOX.BitcoinCash.mnemonicToSeed('enable stem left method one submit coach bid inspire cluster armed bracket')
// <Buffer 0a fa b7 46 8f 0c df 79 0f 0e 44 37 45 0c 33 c3 c8 27 17 42 75 d6 13 02 c3 55 de ef 2e 69 57 e4 f5 dd 55 b6 a8 73 78 6d b8 09 36 75 af 4f 6b 2c 52 63 ... >

// Create Master Private Key w/ rootSeed returned from BITBOX.BitcoinCash.mnemonicToSeed
BITBOX.BitcoinCash.hdNodeFromSeedBuffer(rootSeed);
// HDNode {
//   keyPair:
//    ECPair {
//      d:
//       BigInteger {
//         '0': 16165580,
//         '1': 1698946,
//         '2': 60730916,
//         '3': 61153040,
//         '4': 43535631,
//         '5': 50362316,
//         '6': 59565996,
//         '7': 31216958,
//         '8': 59585223,
//         '9': 2863301,
//         '10': 0,
//         t: 10,
//         s: 0 },
//      compressed: true,
//      network:
//       { messagePrefix: '\u0018Bitcoin Signed Message:\n',
//         bech32: 'bc',
//         bip32: [Object],
//         pubKeyHash: 0,
//         scriptHash: 5,
//         wif: 128 } },
//   chainCode: <Buffer 9e c5 3c 10 2c 6a ea b0 ff 1c d3 1e b4 1b b8 20 f9 dc 7a 32 08 fc 5a 18 ca 5f db ef 09 ea 4c f7>,
//   depth: 0,
//   index: 0,
//   parentFingerprint: 0 }

// Create keypair from private key in wallet import format
BITBOX.BitcoinCash.fromWIF('KxYoF3rr34fxUtGwfeASBrz6AWLjJCMG5wniooriX8NvHucsTDFz')
// ECPair {
//   d:
//    BigInteger {
//      '0': 22234870,
//      '1': 51704986,
//      '2': 65514685,
//      '3': 58120869,
//      '4': 9188204,
//      '5': 19136219,
//      '6': 39908188,
//      '7': 58691735,
//      '8': 30573386,
//      '9': 649733,
//      t: 10,
//      s: 0 },
//   compressed: true,
//   network:
//    { messagePrefix: '\u0018Bitcoin Signed Message:\n',
//      bech32: 'bc',
//      bip32: { public: 76067358, private: 76066276 },
//      pubKeyHash: 0,
//      scriptHash: 5,
//      wif: 128 } }

BITBOX.BitcoinCash.createHDWallet({
  autogenerateHDMnemonic: true,
  autogenerateHDPath: true,
  displayCashaddr: true,
  displayTestnet: false,
  usePassword: false,
  entropy: 16,
  network: 'bitcoin',
  mnemonic: '',
  totalAccounts: 10,
  HDPath: {
    masterKey: "m",
    purpose: "44'",
    coinCode: "145'",
    account: "0'",
    change: "0",
    address_index: "0"
  },
  password: '',
  language: 'spanish'
})
// [ <Buffer 56 83 45 7c 58 10 af 8a 28 ce e0 c4 15 05 b4 0a 87 51 4b f6 da 2c bd d2 a8 f9 93 34 cb 05 10 60 6a 9a 27 44 05 d9 36 41 2b c2 81 0f 48 43 d8 b5 5b 57 ... >,
//   HDNode {
//     keyPair:
//      ECPair {
//        d: [BigInteger],
//        compressed: true,
//        network: [Object],
//        __Q: [Point] },
//     chainCode: <Buffer 57 44 7f da ea e9 03 c8 51 eb 79 da 58 25 58 da fa ef ac 70 1b 5c af af 2b ce d6 05 a5 33 07 94>,
//     depth: 0,
//     index: 0,
//     parentFingerprint: 0 },
//   'mimo razón guardia yate pregunta aclarar rubí oír regla novela ateo carpeta',
//   { masterKey: 'm',
//     purpose: '44\'',
//     coinCode: '145\'',
//     account: '0\'',
//     change: '0',
//     address_index: '0' },
//   [ { title: '',
//       privateKeyWIF: 'L26K2D4KMtD4iRCYoDeAEjJjsicGL38kzMaNEHEenT62broxazWf',
//       xpriv: 'xprv9yVkfirgBMhE7EYfKTeSNJXe5XrZ3mSCjPEdLHSizG4cDQJSd5ACVP4zSK5cj9pcL6oE59Ranhdi1LThXDvZ6MExiF4jSC2HnFkC2sXFUS4',
//       xpub: 'xpub6CV75EPa1jFXKid8RVBSjSUNdZh3TEA46cAE8frLYbbb6CdbAcUT3BPUHbsVd5f2fRfG7ZeqxwsUmfkbLLX39qZ9UFP6m1p8LX5VFT3sZfx',
//       index: 0 },
//     { title: '',
//       privateKeyWIF: 'L15A5qSXxwXVsZJH8ZRWxQkxQjCbyMpLoKRQPv7sR8kJTNbPPQQV',
//       xpriv: 'xprv9yVkfirgBMhE7vLYY3vTgNaKFJSzikdXQSBT2iLnZi8pr8BnNHDhCwZcRZWcW2xoawCEZT7KvyFEHkA2d9DztZaiPvwNXfFpDizRgpng6cK',
//       xpub: 'xpub6CV75EPa1jFXLQR1e5TU3WX3oLHV8DMNmf73q6kQ83foivWvupXwkjt6GseFSWPRzfgPNqkfkwpVutgdsdwCbxBAGZiWoH32MCXdhmvYPKa',
//       index: 1 },
//     { title: '',
//       privateKeyWIF: 'L1WWMkN2QeiJVnd7WCCD6zZfeBaqnAtCVkVRY5MDbdNfEkpSNsXB',
//       xpriv: 'xprv9yVkfirgBMhEBnw2bdBztx5CzL4pKA3aj5RrvZsfvwXD8tqiDfCpKU5w8jHwqnifnFp4svRRQk65wqMWRuVA7QQpFYVExygYT3j5svWSczn',
//       xpub: 'xpub6CV75EPa1jFXQH1Vhej1G61wYMuJicmS6JMTixHHVH4C1hArmCX4sGQQyzKsQ6vSRkzkGsELcphb6QgcTF4kaj3Le4PWx6r6jaVdzY6FYW1',
//       index: 2 },
//     { title: '',
//       privateKeyWIF: 'Kz8YiPgsadTu8hPWAVroCRAPH5Zqyc4DZHAAPMstBiJEd3ixzwSF',
//       xpriv: 'xprv9yVkfirgBMhEDcsTLyDEdkDG1eZRyQUtcvoRJcE1Awe1cLGpHXFdMaf28UKjiSDHuHGK1vFGnwCh6QxRhDnh9gJip5H7aRXzVcLcXGMPEjS',
//       xpub: 'xpub6CV75EPa1jFXS6wvSzkEzt9zZgPvNsCjz9j26zdcjHAzV8bxq4ZsuNyVynLK8Rr1UGch5X4hDNMZ7XiLRXbYx3ASfDEUoUaeRW3vuUyqrn7',
//       index: 3 },
//     { title: '',
//       privateKeyWIF: 'L4cUDGpdkT9YoVJg4FnHdZrScLmFesYRNoMXhDew6ZnLN54Nz8pk',
//       xpriv: 'xprv9yVkfirgBMhEHBN1ekKDeADuFjbhsT3JhienJKJNtQG65umrgGmyCMHUeQ5MckBvHJBoWk4arPgwnNpPohNFGT35x3FfWf1wQCVmTrmKW58',
//       xpub: 'xpub6CV75EPa1jFXVfSUkmrE1JAdomSCGumA4waP6hhzSjo4xi71Dp6Dk9bxVgRtokGRB74MNzmUZkWBhV2fr7V1JA15YXKr5Lk4X4MkBdcABQb',
//       index: 4 },
//     { title: '',
//       privateKeyWIF: 'KxuQ2B4YrTT6yCCi5za4eoYSsBeLdzzDVDiFHfGgSQNBzJ6wB9T7',
//       xpriv: 'xprv9yVkfirgBMhEJ66Hj7Tz9ekkB2FtmS4Quqedbui4sGur9gk4UR1wYqkgagfVWL2WVBzgNSVqxKGnpKAbxawo1AWFRiTrR7DZZ2uawqzUcki',
//       xpub: 'xpub6CV75EPa1jFXWaAkq8zzWnhUj46PAtnGH4aEQJ7gRcSq2V5D1xLC6e5ARyd2mmshGXMqZfFDmdQt6mtbDeUdYVDB1q2UNcHLXJGaC5GyPom',
//       index: 5 },
//     { title: '',
//       privateKeyWIF: 'L4qWFHSzueF47Lzv64yY2fTv1VT1uzzNfVJa4TBmHBvQQ1a3Useh',
//       xpriv: 'xprv9yVkfirgBMhEMyAUVkf21ARXXt1hJe7Hj174CRV7FZFFJRbYGo4WwYJ4fHLgpj1UrZwV2MSp2RgMPMzpSMKPbGYo6UHF1SuMuib6gKLJFLU',
//       xpub: 'xpub6CV75EPa1jFXaTEwbnC2NJNG5urBi6q96E2ezotiotnEBDvgpLNmVLcYWYfxheRBStYabwEM4ihg3nJdtFsSFe7rqqcJdqpHspv8dWyQ72F',
//       index: 6 },
//     { title: '',
//       privateKeyWIF: 'L5i4NHeUNqKygxsALbF7gLV2rgT2QnkKUwtBQhzx2NKWPhTx75Up',
//       xpriv: 'xprv9yVkfirgBMhEPcY3Dd7JkL5wsoz1bx7C4h9poxet7v3Xjkgu2m9Q3rPhXHUBfRtzkzNd19jccmciNNbpCtDKHU7Kd6bjoTFkfftGMzZdJpG',
//       xpub: 'xpub6CV75EPa1jFXc6cWKeeK7U2gRqpW1Qq3Rv5RcM4VgFaWcZ23aJTebeiBNXda4cjSSMykMnnr9VtrXzDab48LDFt84WaXfRAJJVXNqwfuwKm',
//       index: 7 },
//     { title: '',
//       privateKeyWIF: 'L44unYGMdMv2XxY7FNqqsmQZSegrJsPgc1zBRjPakWsviVf5QGne',
//       xpriv: 'xprv9yVkfirgBMhETYcXmDAuKTEX7rJhDPthVZoSgbbUTbLAM8SuisKcvE45oxXGUZnNeRpFwdCdW4euTqiiS5Pt8h9AzmW6a9mCFWrbn8XCBSX',
//       xpub: 'xpub6CV75EPa1jFXg2gzsEhugbBFft9BcrcYrnj3Uz161vs9Dvn4GQdsU2NZfDjb4mQdwUNzY4mYUYSCKxQeavEKgBpTfQJ1HGRUa3TUgN6rDKe',
//       index: 8 },
//     { title: '',
//       privateKeyWIF: 'L2pc9nbifadeKgb6KcMkPhnQY48dwy9GqMxsgQ5evEXXhr3hma1J',
//       xpriv: 'xprv9yVkfirgBMhEUTbLKjA22tp3BKtyENaQKuTTbga3JREdkEG8fL25MVpceE116mWeYRDNFSmXbgtXseVGVw2w5h3vhGd26gsEgJRrswpbAJL',
//       xpub: 'xpub6CV75EPa1jFXgwfoRkh2Q2kmjMjTdqJFh8P4Q4yerkmcd2bHCsLKuJ96VTGWipc58bKkK5aYNiEwVs5gMbFbncmXg18j5cAjZBpJkjsTSTS',
//       index: 9 } ] ]

// Generate first 5 public change addresses for given xpub
for(let i = 0; i <= 4; i++) {
  BITBOX.BitcoinCash.fromXPub("xpub6DTNmB7gWa8RtQAfmy8wSDikM5mky4fhsnqQd9AqoCaLcekqNgRZW5JCSXwXkLDkABHTD1qx7kqrbGzT6xBGfAvCJSj2rwvKWP8eZBR2EVA", i)
}
// bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh
// bitcoincash:qrr2suh9yjsrkl2qp3p967uhfg6u0r6xxsn9h5vuvr
// bitcoincash:qpkfg4kck99wksyss6nvaqtafeahfnyrpsj0ed372t
// bitcoincash:qppgmuuwy07g0x39sx2z0x2u8e34tvfdxvy0c2jvx7
// bitcoincash:qryj8x4s7vfsc864jm0xaak9qfe8qgk245y9ska57l

// Generate an array keypairs from a mnemonic
BITBOX.BitcoinCash.keypairsFromMnemonic("toward tribe logic visa relief domain fun toy apart popular tooth power", 15)
// [ { privateKeyWIF: 'Ky54Y7sxkGovqTi5ogipFUToqsz4NCepLn3bitzHyiF3JaYULMbP',
//     address: 'bitcoincash:qzq53zlu48a00h0a8ay8gq3wnkvfxc50cv6fj5qm9d' },
//   { privateKeyWIF: 'KzkgRUDjAofdLvwHFGEyhtiULPYpKDozgfkz5yWR1S39isWHWPrz',
//     address: 'bitcoincash:qrpuxwzerdfm5plxzxekya3js9wn2f4wa5lcgnat7c' },
//   { privateKeyWIF: 'Kyb6tWZUfppAyQMRX9b1yAKahFDn8Xr2dY26tk7nM9s5cLvvFuqS',
//     address: 'bitcoincash:qpq7zz6ax7lun9ks92g5qwye206xkenc655y4x7rfn' },
//   { privateKeyWIF: 'KzoVcYVG1dqVPa8AASR9tjXQHqs8KDx9Ex3WrwaEYPPxJ76gTZC2',
//     address: 'bitcoincash:qp22q7vt79qp724zvk0qkj59ec4h9ghx9yscnl3mpw' },
//   { privateKeyWIF: 'KwEYU8cuczmym3KXUcVqmQS2R4zcKgzQ8ba2R54LHuSsY2wKXXkF',
//     address: 'bitcoincash:qzul5ttllyky9tcdmc458tw0fymtc2mkvc75542prl' } ]

// base58check encode a hex encoded string
let hex = '0079bd35d306f648350818470c9f18903df6e06902a026f2a7';
let bytes = Buffer.from(hex, 'hex');
BITBOX.BitcoinCash.encodeBase58Check(bytes);
// 1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar

// decode a base58Check encoded string
let base58check = '1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar';
BITBOX.BitcoinCash.decodeBase58Check(base58check);
// 0079bd35d306f648350818470c9f18903df6e06902a026f2a7

// encode bip21 uri
BITBOX.BitcoinCash.encodeBIP21(address, options);
// bitcoincash:qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s?amount=1&label=%23BCHForEveryone

// decode bip21 uri
BITBOX.BitcoinCash.decodeBIP21(bip21);
// { address: 'qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s', options: { amount: 1, label: '#BCHForEveryone' } }

let data = 'EARTH';
BITBOX.Crypto.createHash(data, 'sha256')
// bcfee25a8baf6808fce5ff4e63cf21c8d114853ca7eacdcc3c210d73c58dab66
BITBOX.Crypto.createSHA256Hash(data)
// bcfee25a8baf6808fce5ff4e63cf21c8d114853ca7eacdcc3c210d73c58dab66
BITBOX.Crypto.createRIPEMD160Hash(data)
// ca700bba3bd37304b9bd923652245f598ece8afe
BITBOX.Crypto.randomBytes(32)
// 6e1453357f6f99d19d2a6554f35eab65b6c27f6572e31d7f2faa696cac57759b

// To connect to your local bitbox or a remote $BCH node
let BITBOX = new BITBOXCli({
  protocol: 'http',
  host: '127.0.0.1',
  port: 8332,
  username: '',
  password: ''
});

BITBOX.getinfo()
.then((result) => {
  console.log(result)
}, (err) => { console.log(err);
});

```

[Full list](https://www.bitbox.earth/bitboxcli/bitcoincash) of available methods.

## Credits

`bitbox-cli` leverages several really great libraries. Please show these people support.

* https://nodejs.org/api/crypto.html
* https://github.com/bitcoinjs/bitcoinjs-lib
* https://github.com/bitcoinjs/bip39
* https://github.com/bitcoincashjs/bchaddrjs
* https://github.com/dawsbot/satoshi-bitcoin

1. create mnemonic
  * let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(128)
  * let mnemonic = BITBOX.BitcoinCash.Mnemonic.entropyToMnemonic(BITBOX.Crypto.randomBytes(32))
2. create rootSeed
  * let rootSeedBuffer = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedBuffer(mnemonic);
  * let rootSeedHex = BITBOX.BitcoinCash.mnemonicToSeedHex(mnemonic);
3. Create HDNode
  * let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedBuffer(rootSeedBuffer);
  * let hdNode = BITBOX.BitcoinCash.HDNode.fromSeedHex(rootSeedHex);
4. See xpriv, xpub and address of hdNode
  * let xpriv = BITBOX.BitcoinCash.HDNode.toXPriv(hdNode);
  * let xpub = BITBOX.BitcoinCash.HDNode.toXPub(hdNode);
  * let address = BITBOX.BitcoinCash.HDNode.getCashAddress(hdNode);
5. Derive Children HDNodes
  * let account0 = hdNode.fromPath('m/0');
