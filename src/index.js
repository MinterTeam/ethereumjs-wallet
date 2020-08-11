// @TODO remove some wordlists
import * as bip39 from 'bip39';
import { HDKey as hdKey } from 'ethereum-cryptography/hdkey';
import { isValidPrivate, privateToPublic, publicToAddress } from 'ethereumjs-util/dist/account';
import { publicToString } from 'minterjs-util';

function assert(val, msg) {
    if (!val) {
        throw new Error(msg || 'Assertion failed');
    }
}

/**
 * BIP39 Master seed from mnemonic phrase
 * @param mnemonic - 12 words
 * @return {Buffer}
 */
export function seedFromMnemonic(mnemonic) {
    return bip39.mnemonicToSeedSync(mnemonic);
}

/**
 * BIP44 HD key from master seed
 * @param {Buffer} seed - 64 bytes
 * @return {HDKey}
 */
export function hdKeyFromSeed(seed) {
    return hdKey.fromMasterSeed(seed).derive("m/44'/60'/0'/0").deriveChild(0);
}

/**
 * @param {Buffer} [priv]
 * @param {string} [mnemonic]
 * @constructor
 */
const Wallet = function WalletConstructor(priv, mnemonic) {
    if (priv && mnemonic) {
        throw new Error('Cannot supply both a private and a mnemonic phrase to the constructor');
    }

    if (priv && !isValidPrivate(priv)) {
        throw new Error('Private key does not satisfy the curve requirements (ie. it is invalid)');
    }

    if (mnemonic && !bip39.validateMnemonic(mnemonic)) {
        throw new Error('Invalid mnemonic phrase');
    }

    if (mnemonic) {
        const seed = seedFromMnemonic(mnemonic);
        priv = hdKeyFromSeed(seed)._privateKey;
    }

    this._privKey = priv;
    this._mnemonic = mnemonic;
};

Object.defineProperty(Wallet.prototype, 'mnemonic', {
    get() {
        assert(this._mnemonic, 'This is a private key only wallet');
        return this._mnemonic;
    },
});

Object.defineProperty(Wallet.prototype, 'privKey', {
    get() {
        return this._privKey;
    },
});

// uncompressed public key
Object.defineProperty(Wallet.prototype, 'pubKey', {
    get() {
        if (!this._pubKey) {
            this._pubKey = privateToPublic(this.privKey);
        }
        return this._pubKey;
    },
});

/**
 * @return {string}
 */
Wallet.prototype.getMnemonic = function getMnemonic() {
    return this.mnemonic;
};

/**
 * @return {Buffer}
 */
Wallet.prototype.getPrivateKey = function getPrivateKey() {
    return this.privKey;
};

/**
 * @return {string}
 */
Wallet.prototype.getPrivateKeyString = function getPrivateKeyString() {
    return `0x${this.getPrivateKey().toString('hex')}`;
};

/**
 * @return {Buffer}
 */
Wallet.prototype.getPublicKey = function getPublicKey() {
    return this.pubKey;
};

/**
 * @return {string}
 */
Wallet.prototype.getPublicKeyString = function getPublicKeyString() {
    return publicToString(this.getPublicKey());
};

/**
 * @return {Buffer}
 */
Wallet.prototype.getAddress = function getAddress() {
    return publicToAddress(this.pubKey);
};

/**
 * @return {string}
 */
Wallet.prototype.getAddressString = function getAddressString() {
    return `Mx${this.getAddress().toString('hex')}`;
};

/**
 * Generate Wallet from random mnemonic
 * @return {Wallet}
 */
export function generateWallet() {
    const mnemonic = bip39.generateMnemonic();
    return walletFromMnemonic(mnemonic);
}

/**
 * MinterWallet from mnemonic phrase
 * @param {string} mnemonic - 12 words
 * @return {Wallet}
 */
export function walletFromMnemonic(mnemonic) {
    return new Wallet(null, mnemonic);
}

/**
 * MinterWallet from private key
 * @param {Buffer} priv - 64 bytes
 * @return {Wallet}
 */
export function walletFromPrivateKey(priv) {
    return new Wallet(priv);
}

/**
 * Generate 12 words mnemonic phrase
 * @return {string}
 */
export function generateMnemonic() {
    return bip39.generateMnemonic();
}

/**
 * Check that mnemonic phrase has 12 words and represents valid entropy
 * @param {string} mnemonic
 * @return {boolean}
 */
export function isValidMnemonic(mnemonic) {
    return typeof mnemonic === 'string' && mnemonic.trim().split(/\s+/g).length >= 12 && bip39.validateMnemonic(mnemonic);
}

export default Wallet;
