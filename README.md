# Minter JS Wallet

[![NPM Package](https://img.shields.io/npm/v/minterjs-wallet.svg?style=flat-square)](https://www.npmjs.org/package/minterjs-wallet)
[![Build Status](https://img.shields.io/travis/com/MinterTeam/minterjs-wallet/master.svg?style=flat-square)](https://travis-ci.com/MinterTeam/minterjs-wallet)
[![Coverage Status](https://img.shields.io/coveralls/github/MinterTeam/minterjs-wallet/master.svg?style=flat-square)](https://coveralls.io/github/MinterTeam/minterjs-wallet?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/MinterTeam/minterjs-wallet/blob/master/LICENSE)

A lightweight Minter Wallet implementation.
Forked from [ethereumjs-wallet](https://github.com/ethereumjs/ethereumjs-wallet)

It is complemented by the following packages:
- [minter-js-sdk](https://github.com/MinterTeam/minter-js-sdk) complete JS solution to work with Minter
- [minterjs-tx](https://github.com/MinterTeam/minterjs-tx) to sign transactions
- [minterjs-util](https://github.com/MinterTeam/minterjs-util) utility functions

Motivations are:
- be lightweight
- work in a browser
- support BIP39 mnemonic phrases
- support BIP32 HD keys

Features not supported:
- signing transactions
- managing storage (neither in node.js or the browser)
- conversion between various wallet formats

## Install

```npm install minterjs-wallet```

or from browser

```html
<script src="https://unpkg.com/minterjs-wallet"></script>
<script>
const wallet = minterWallet.generateWallet();
const wallet2 = minterWallet.walletFromMnemonic('...');
// use async for better performance
const wallet3 = await minterWallet.walletFromMnemonicAsync('...');
</script>
```

## Wallet API

### Construction methods:

#### `generateWallet()`
Generates wallet from a random BIP39 mnemonic phrase (uses `bip39.generateMnemonic()` under the hood).
```js
import {generateWallet} from 'minterjs-wallet';
const wallet = generateWallet();
```

#### `walletFromMnemonic(mnemonic)`
Create a wallet instance based on BIP39 12 words mnemonic phrase
```js
import {walletFromMnemonic} from 'minterjs-wallet';
const wallet = walletFromMnemonic('surround tape away million into program organ tonight write prefer inform cool');
```

#### `walletFromMnemonicAsync(mnemonic)`
Same as `walletFromMnemonic` but async and has better performance in browser, beacause it uses `window.crypto.subtle` under hood
```js
import {walletFromMnemonicAsync} from 'minterjs-wallet';
const wallet = await walletFromMnemonicAsync('surround tape away million into program organ tonight write prefer inform cool');
```

#### `walletFromPrivateKey(privateKey)`
Create a wallet instance based on a raw private key
```js
import {walletFromPrivateKey} from 'minterjs-wallet';
const privateKeyBuffer = Buffer.from('ef2af2385681c490bc473c2f7e6097fc1a38e6f67b44b81a3350a6583aadd144', 'hex')
const wallet = walletFromPrivateKey(privateKeyBuffer);
```


### Wallet instance methods:

#### `.getAddress()`
Return the address: 20 bytes length Buffer or Uint8Array
```js
wallet.getAddress();
// [88,108,62,182,16,84,7,36,101,31,244,29,32,158,20,41,238,62,68,154]
```

#### `.getAddressString()`
Return the Minter-style address
```js
wallet.getAddress();
// 'Mx586c3eb610540724651ff41d209e1429ee3e449a'
```

#### `.getMnemonic()`
Return the mnemonic phrase: 12 words string.
**Note:** Only works with instance created/generated from mnemonic, otherwise it will throw an error.
```js
wallet.getMnemonic();
// 'surround tape away million into program organ tonight write prefer inform cool'
```

#### `.getPrivateKey()`
Return the private key: 32 bytes length Buffer or Uint8Array
```js
wallet.getPrivateKey();
// [239,42,242,56,86,129,196,144,188,71,60,47,126,96,151,252,26,56,230,246,123,68,184,26,51,80,166,88,58,173,209,68]
```

#### `.getPrivateKeyString()`
Return the private key string of 64 hex characters
```js
wallet.getPrivateKeyString();
// 'ef2af2385681c490bc473c2f7e6097fc1a38e6f67b44b81a3350a6583aadd144'
```

#### `.getPublicKey()`
Return the uncompressed Ethereum-style public key: 64 bytes length Buffer or Uint8Array
```js
wallet.getPublicKey();
// [251,82,201,189,133,251,174,27,6,6,18,34,12,222,116,254,99,169,65,249,135,81,170,13,35,99,50,6,231,95,48,69,41,47,96,75,240,242,9,77,23,168,173,59,137,223,128,80,144,69,34,91,145,21,255,133,112,189,68,8,42,245,210,116]
```

#### `.getPublicKeyString()`
Return the Minter-style public key string
```js
wallet.getPublicKeyString();
// 'Mpfb52c9bd85fbae1b060612220cde74fe63a941f98751aa0d23633206e75f3045'
```

### Mnemonic

#### `generateMnemonic()`
Generate random 12 words mnemonic phrase. Exposed `bip39.generateMnemonic()`.
```js
import {generateMnemonic} from 'minterjs-wallet';
const mnemonic = generateMnemonic();
// 'surround tape away million into program organ tonight write prefer inform cool'
```

#### `isValidMnemonic(mnemonic)`
Check that given mnemonic is valid, returns `boolean`, uses `bip39.validateMnemonic()` under the hood.
```js
import {isValidMnemonic} from 'minterjs-wallet';
const isValid = isValidMnemonic('surround tape away million into program organ tonight write prefer inform cool');
// true
```

## License

MIT License
