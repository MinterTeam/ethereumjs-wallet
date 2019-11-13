## 4.0.4 - 2019-11-13
- drop safe-buffer dep
- drop des.js dep, it's updated and no need to dedupe more

## 4.0.3 - 2019-11-13
- update deps

## 4.0.2 - 2019-10-01
- update deps

## 4.0.1 - 2019-08-15
- update deps

## 4.0.0 - 2019-07-30
- **BREAKING** rename UMD module from `minterJsTx` to `minterWallet`
- fix browser usage of UMD module
- tweak bundle tests

## 3.0.4 - 2019-07-08
- update deps

## 3.0.3 - 2019-06-05
- update deps

## 3.0.2 - 2019-05-14
- update deps

## 3.0.1 - 2019-02-28
- fix package.json "browser" field

## 3.0.0 - 2019-02-27
Align package structure to other minterjs packages.
- **BREAKING** dist/index.js now contain UMD build without es modules 
- add UMD and commonjs builds
- replace `mocha` with `jest`
- replace `standard` with `eslint`'s airbnb config
- update deps

## 2.2.2 - 2019-02-18
- Update deps 
- fix ethereumjs-util

## 2.2.1 - 2018-11-30
- Update deps 

## 2.2.0 - 2018-11-97
- Add `generateMnemonic()` and `isValidMnemonic()` methods

## 2.1.1 - 2018-08-09
- Move source to /src directory (from ethereumjs-wallet merge) 
- Add `module` field to package.json

## 2.1.0 - 2018-07-18
- Change public key string format to Minter style `Mp...`
- Explicitly set options to `babel-register` instead of `.babelrc` lookup

## 2.0.4 - 2018-07-12
- Separate construction methods from Wallet instance

## 2.0.1 - 2018-07-10
- Add generation from random BIP39 mnemonic

## 2.0.0 - 2018-07-10
- Added creation from BIP39 mnemonic
- Removed unused Ethereum methods from Wallet
- Removed HDKey wrapper, use [hdkey](https://github.com/cryptocoinjs/hdkey) instead
- Removed thirdparty generation
- Removed provider engine
- Updated to ES2015 syntax

## 1.0.1 - 2018-05-29
- fork from [ethereumjs-wallet](https://github.com/ethereumjs/ethereumjs-wallet)
- update address string format to `Mx`
- remove `0x` from keys string format


## [0.6.1] - 2018-07-28
- Added support for vanity address generation, PR [#5](https://github.com/ethereumjs/ethereumjs-wallet/pull/5)
- Fixed typo in provider-engine, PR [#16](https://github.com/ethereumjs/ethereumjs-wallet/pull/16)
- Accept the true range of addresses for ICAP direct, PR [#6](https://github.com/ethereumjs/ethereumjs-wallet/pull/6)
- Switched to babel ES5 build, PR [#37](https://github.com/ethereumjs/ethereumjs-wallet/pull/37)
- Improve test coverage (at 88% now), PR [#27](https://github.com/ethereumjs/ethereumjs-wallet/pull/27)
- Various dependency updates, PR [#25](https://github.com/ethereumjs/ethereumjs-wallet/pull/25)

[0.6.1]: https://github.com/ethereumjs/ethereumjs-wallet/compare/v0.6.0...v0.6.1

## [0.6.0] - 2016-04-27
- Added provider-engine integration, PR [#7](https://github.com/ethereumjs/ethereumjs-wallet/pull/7)

[0.6.0]: https://github.com/ethereumjs/ethereumjs-wallet/compare/v0.5.2...v0.6.0

## [0.5.2] - 2016-04-25
- Dependency updates

[0.5.2]: https://github.com/ethereumjs/ethereumjs-wallet/compare/v0.5.1...v0.5.2

## [0.5.1] - 2016-03-26
- Bugfix for ``EthereumHDKey.privateExtendedKey()``
- Added travis and coveralls support
- Documentation and test improvements

[0.5.1]: https://github.com/ethereumjs/ethereumjs-wallet/compare/v0.5.0...v0.5.1

## [0.5.0] - 2016-03-23
- Support HD keys using ``cryptocoinjs/hdkey``
- Ensure private keys are valid according to the curve
- Support instantation with public keys
- Support importing BIP32 xpub/xpriv
- Only support Ethereum keys internally, non-strict mode for importing compressed ones
- Thirdparty API doc improvements

[0.5.0]: https://github.com/ethereumjs/ethereumjs-wallet/compare/v0.4.0...v0.5.0

## Older releases:

- [0.4.0](https://github.com/ethereumjs/ethereumjs-wallet/compare/v0.3.0...v0.4.0) - 2016-03-16
- [0.3.0](https://github.com/ethereumjs/ethereumjs-wallet/compare/v0.2.1...v0.3.0) - 2016-03-09
- [0.2.1](https://github.com/ethereumjs/ethereumjs-wallet/compare/v0.2.0...v0.2.1) - 2016-03-07
- [0.2.0](https://github.com/ethereumjs/ethereumjs-wallet/compare/v0.1.0...v0.2.0) - 2016-03-07
- 0.1.0 - 2016-02-23
